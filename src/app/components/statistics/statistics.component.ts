import {Component, OnInit} from '@angular/core';
import {Chart, registerables} from 'chart.js';
import {ClassificationService} from '../../services/classification.service';
import {TokenStorageService} from '../../services/token-storage.service';
import {ClassificationStatistic} from '../../models/ClassificationStatistic';
import {ClassificationStatisticEntry} from '../../models/ClassificationStatisticEntry';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  dateFilter: FormGroup;
  chart: Chart;

  startDate: Date = new Date(new Date().setDate(new Date().getDate() - 7));
  endDate: Date = new Date();

  constructor(private classificationService: ClassificationService,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    Chart.register(...registerables);

    this.dateFilter = new FormGroup({
      start: new FormControl(this.startDate),
      end: new FormControl(this.endDate)
    });

    this.buildChart();
  }

  private buildChart(): void {
    const canvas = document.getElementById('statisticsChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (this.chart) {
      this.chart.destroy();
    }
    this.classificationService.getClassificationStatistic(this.tokenStorageService.getUserDetails().id,
      this.startDate.valueOf(),
      this.endDate.valueOf()).subscribe(
      data => {
        const chartLabels = this.extractLabelsFromStatistic(data, 10);
        const chartDatasets = this.extractDatasetsFromStatistic(data, 10);
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: chartLabels,
            datasets: chartDatasets
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    );
  }

  private extractLabelsFromStatistic(classificationStatistic: ClassificationStatistic, max: number): string[] {
    return this.extractClassificationStatisticEntries(classificationStatistic, max).map(entry => entry.entryKey);
  }

  private extractDatasetsFromStatistic(classificationStatistic: ClassificationStatistic, max: number): any {
    if (classificationStatistic.size === 0) {
      return [];
    }
    const max2 = max > classificationStatistic.size ? classificationStatistic.size : max;
    const classificationEntries = this.extractClassificationStatisticEntries(classificationStatistic, max2);
    const dataVal = classificationEntries.map(entry => entry.entryValue.classificationCount);
    const BACKGROUND = [
      'rgba(148, 0, 211, 0.3)',
      'rgba(75, 0, 130, 0.3)',
      'rgba(0, 0, 255, 0.3)',
      'rgba(0, 255, 0, 0.3)',
      'rgba(255, 255, 0, 0.3)',
      'rgba(255, 127, 0, 0.3)',
      'rgba(255, 0, 0, 0.3)'
    ];
    const BORDER = [
      'rgba(148, 0, 211, 1)',
      'rgba(75, 0, 130, 1)',
      'rgba(0, 0, 255, 1)',
      'rgba(0, 255, 0, 1)',
      'rgba(255, 255, 0, 1)',
      'rgba(255, 127, 0, 1)',
      'rgba(255, 0, 0, 1)'
    ];
    const backgroundColorVal = [];
    const borderColorVal = [];
    for (let i = 0; i < max2; i++) {
      backgroundColorVal.push(BACKGROUND[i % BACKGROUND.length]);
      borderColorVal.push(BORDER[i % BORDER.length]);
    }
    return [{
      label: 'Number of classifications',
      data: dataVal,
      backgroundColor: backgroundColorVal,
      borderColor: borderColorVal,
      borderWidth: 1
    }];
  }

  private extractClassificationStatisticEntries(classificationStatistic: ClassificationStatistic, max: number):
    ClassificationStatisticEntry[] {
    const result = [];
    for (const [key, value] of Object.entries(classificationStatistic)) {
      if (result.length < max) {
        result.push({
          entryKey: key,
          entryValue: value
        });
      }
    }
    result.sort((a, b) => b.entryValue.classificationCount - a.entryValue.classificationCount);
    return result;
  }

  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement): void {
    if (dateRangeStart.value) {
      this.startDate = new Date(Date.parse(dateRangeStart.value));
    }
    if (dateRangeEnd.value) {
      this.endDate = new Date(Date.parse(dateRangeEnd.value));
    }
    this.buildChart();
  }
}
