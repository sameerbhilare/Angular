import { Directive, ElementRef, Renderer2, OnInit, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit{

  @Input() defaultColor: string = 'transarent';
  @Input('appBetterHighlight') highlightColor: string;

  @HostBinding('style.backgroundColor') backgroundColor: string = this.defaultColor;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.backgroundColor = this.defaultColor;
    //this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'lightblue');
  }

  @HostListener('mouseenter') mouseEnter(eventData: Event){
    //this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'lightblue');
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseLeave(eventData: Event){
    //this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
    this.backgroundColor = this.defaultColor;
  }
}
