import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terms',
  imports: [],
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.css'
})
export class TermsComponent implements OnInit {

  headerText = '';
  currentTheme = 'black-green';
  private headerFullText = 'TERMS & CONDITION';
  private headerCharIndex = 0;
  private typingSpeed = 100;

  ngOnInit() {
    this.typeHeader();
  }

  switchTheme(theme: string) {
    this.currentTheme = theme;
    document.body.className = `theme-${theme}`;
  }

  typeHeader() {
    if (this.headerCharIndex < this.headerFullText.length) {
      this.headerText = this.headerFullText.slice(0, this.headerCharIndex + 1);
      this.headerCharIndex++;
      setTimeout(() => this.typeHeader(), this.typingSpeed);
    }
  }
}
