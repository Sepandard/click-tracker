import { Component, Renderer2 } from '@angular/core';
declare let h337: any;

export interface Coordinate {
  x: number;
  y: number;
  value: number;
}

const MOUSE_CIRCLE_RADIUS = 25;
const MOUSE_CIRCLE_TRANSL_RADIUS = 10;
const HEATMAP_HEIGHT = window.screen.height;
const HEATMAP_WIDTH = window.screen.width;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  gradientCfg = {
    0.15: '#6ad180', // green
    0.25: '#7cd573',
    0.35: '#90d865',
    0.45: '#a4da57',
    0.55: '#badc48',
    0.65: '#c9cf35',
    0.75: '#d6c226',
    0.8: '#e2b41c',
    0.85: '#e2961d',
    0.9: '#dd7826',
    0.95: '#d25c30',
    1.0: '#c24039', // highest red
  };
  heatmap: any = null;
  coordinates: Array<Coordinate> = [];
  selectedCoordinates: Array<Coordinate> = [];
  heatmapContainer: HTMLElement;
  tooltip: HTMLElement;
  isMouseInsideHeatmap = false;
  mouseCircle: HTMLElement;
  xMinCoord: number;
  yMinCoord: number;
  xMaxCoord: number;
  yMaxCoord: number;

  show: boolean = false;
  clickEventsArr: any[] = [];
  constructor(private renderer: Renderer2) {}
  onTrack(clickEvent) {
    console.log(window.screen.height, window.screen.width);

    this.clickEventsArr.push({
      y: `${clickEvent.layerY - 10}px`,
      x: `${clickEvent.layerX - 10}px`,
    });
    this.coordinates.push({
      x: clickEvent.layerX,
      y: clickEvent.layerY,
      value: 15,
    });
    console.log(this.coordinates);
    this.calculateMinMaxCoord();
    this.genHeatMap();
  }
  ngOnInit(): void {
    this.generateCoordinates();
    this.calculateMinMaxCoord();
  }
  genHeatMap() {
    const heatmapConfig = {
      container: document.querySelector('#heatmapContainer'),
      opacity: 0.8,
      radius: 7,
      visible: true,
      gradient: this.gradientCfg,
      backgroundColor: 'inherit',
    };
    this.heatmap = h337.create(heatmapConfig);
    this.heatmap.setData({ max: 30, data: this.coordinates });

    this.heatmapContainer = document.querySelector('#heatmapContainer');
    this.tooltip = this.renderer.createElement('div');
    this.renderer.addClass(this.tooltip, 'heatmap-tooltip');
    this.renderer.setStyle(this.tooltip, 'display', 'none');
    this.renderer.setStyle(this.tooltip, 'transform', 'translate(39px, 489px)');
    this.mouseCircle = this.renderer.createElement('div');
    this.renderer.addClass(this.mouseCircle, 'mouseCircle');
    this.renderer.setStyle(this.mouseCircle, 'display', 'none');
    this.renderer.setStyle(
      this.mouseCircle,
      'transform',
      'translate(39px, 489px)'
    );
    this.renderer.appendChild(this.heatmapContainer, this.tooltip);
    this.renderer.appendChild(this.heatmapContainer, this.mouseCircle);
  }
  calculateMinMaxCoord(): void {
    if (!this.coordinates.length) {
      return;
    }
    this.xMinCoord = this.coordinates[0].x;
    this.xMaxCoord = 0;
    this.yMinCoord = this.coordinates[0].y;
    this.yMaxCoord = 0;
    this.coordinates.forEach((element) => {
      if (element.x < this.xMinCoord) {
        this.xMinCoord = element.x;
      }
      if (element.y < this.yMinCoord) {
        this.yMinCoord = element.y;
      }
      if (element.x > this.xMaxCoord) {
        this.xMaxCoord = element.x;
      }
      if (element.y > this.yMaxCoord) {
        this.yMaxCoord = element.y;
      }
    });
  }
  generateCoordinates(): void {
    // // tslint:disable-next-line: no-bitwise
    // const extremas = [(Math.random() * 1000) >> 0, (Math.random() * 1000) >> 0];
    // const max = Math.max.apply(Math, extremas);
    // const min = Math.min.apply(Math, extremas);
    // for (let i = 0; i < 1000; i++) {
    //   // tslint:disable-next-line: no-bitwise
    //   const x = (Math.random() * HEATMAP_WIDTH) >> 0;
    //   // tslint:disable-next-line: no-bitwise
    //   const y = (Math.random() * HEATMAP_HEIGHT) >> 0;
    //   // tslint:disable-next-line: no-bitwise
    //   const c = ((Math.random() * max - min) >> 0) + min;
    //   // add to dataset
    //   // this.coordinates.push({ x, y, value: 10 });
    // }
  }
}
