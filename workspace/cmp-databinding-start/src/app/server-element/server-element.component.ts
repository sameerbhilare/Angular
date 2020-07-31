import { Component, OnInit, Input, ViewEncapsulation, OnChanges, SimpleChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, ViewChild, ElementRef, ContentChild } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated // Emulated is default
})
export class ServerElementComponent implements 
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {

  @Input('srvElement')
  element : {name: string, type: string, content: string};

  @Input()
  name: string;

  @ViewChild('heading') header: ElementRef;

  @ContentChild('contentParagraph') paragraph: ElementRef;

  constructor() { 
    console.log('constructor called');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges called');
    console.log(changes);
  }

  ngDoCheck(): void {
    console.log('ngDoCheck called');
  }

  ngOnInit(): void {
    console.log('ngOnInit called');
    console.log('*** Text Content: '+this.header.nativeElement.textContent);
    console.log('*** Child Content: '+this.paragraph.nativeElement.textContent);
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit called');
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked called');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called');
    console.log('*** Text Content: '+this.header.nativeElement.textContent);
    console.log('*** Child Content: '+this.paragraph.nativeElement.textContent);
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked called');
  }
  
  ngOnDestroy(): void {
    console.log('ngOnDestroy called');
  }

}
