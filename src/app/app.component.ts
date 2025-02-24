import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isLoading = true;
  currentTitle = '';
  headerText = '';
  currentTheme = 'black-green';
  loadingMessages: string[] = [
    '> Booting up...',
    '> Fetching profile...',
    '> Decrypting credentials...',
    '> Establishing secure connection...'
  ];
  currentMessageIndex = 0;
  private headerFullText = 'PORTFOLIO';
  private skillsets = [
    'Languages (Typescript, JavaScript, Java, HTML, CSS)',
    'Frameworks (Angular, Spring Boot, Java Spark, Ionic)',
    'Tools (Linux, Windows, Git, Github, MySQL, Postgres, NX, Jira)',
    'Cloud (AWS, GCP, Firebase, Heroku, Netlify)',
    'Concepts: Networking and Network Security, Security Analysis, Vulnerability Assessment, Cloud Computing, Scrum, Zero Trust/Identity First, SIEM, SOAR, Firewall, IDS/IPS, NAT, VPN, Forensics, SOC, SOC Automation, Scripting and Automation, Security Standards and Frameworks'
  ];
  private titleIndex = 0;
  private charIndex = 0;
  private headerCharIndex = 0;
  private typingSpeed = 100;
  private pauseDuration = 2000;

  ngOnInit() {
    this.typeHeader();
    this.runSecurityChecks();
  }

  typeHeader() {
    if (this.headerCharIndex < this.headerFullText.length) {
      this.headerText = this.headerFullText.slice(0, this.headerCharIndex + 1);
      this.headerCharIndex++;
      setTimeout(() => this.typeHeader(), this.typingSpeed);
    }
  }

  typeNextTitle() {
    if (this.charIndex < this.skillsets[this.titleIndex].length) {
      this.currentTitle = this.skillsets[this.titleIndex].slice(0, this.charIndex + 1);
      this.charIndex++;
      setTimeout(() => this.typeNextTitle(), this.typingSpeed);
    } else {
      setTimeout(() => {
        this.currentTitle = '';
        this.charIndex = 0;
        this.titleIndex = (this.titleIndex + 1) % this.skillsets.length;
        this.typeNextTitle();
      }, this.pauseDuration);
    }
  }

  runSecurityChecks() {
    const checks = [
      () => this.checkHTTPS(),
      () => this.fetchProfile(),
      () => this.decryptCredentials(),
      () => this.establishConnection()
    ];

    const runCheck = (index: number) => {
      if (index < checks.length) {
        checks[index]();
        setTimeout(() => {
          this.currentMessageIndex = index + 1;
          runCheck(index + 1);
        }, 1000);
      } else {
        this.isLoading = false;
        this.typeNextTitle();
      }
    };

    runCheck(0);
  }

  checkHTTPS() {
    const isSecure = window.location.protocol === 'https:';
    this.loadingMessages[0] = isSecure ? '> Booting up... [SECURE]' : '> Booting up... [INSECURE]';
  }

  fetchProfile() {
    this.loadingMessages[1] = '> Fetching profile... [OK]';
  }

  decryptCredentials() {
    const hash = Math.random().toString(16).slice(2, 10).toUpperCase();
    this.loadingMessages[2] = `> Decrypting credentials... [KEY: ${hash}]`;
  }

  establishConnection() {
    const isOnline = navigator.onLine;
    this.loadingMessages[3] = isOnline ? '> Establishing secure connection... [OK]' : '> Establishing secure connection... [OFFLINE]';
  }

  downloadCV() {
    const link = document.createElement('a');
    link.href = 'https://drive.google.com/file/d/1ZWwvTKVECfXbivoUEhWIGDKsqer4jeI5/view?usp=sharing';
    link.download = 'Collins_Boit_CV.pdf';
    link.click();
  }

  switchTheme(theme: string) {
    this.currentTheme = theme;
    document.body.className = `theme-${theme}`;
  }
}