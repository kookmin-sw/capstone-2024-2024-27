# ![Logo_color](https://github.com/kookmin-sw/capstone-2024-27/assets/89867182/da8c56eb-9500-4769-b20e-a6ca45bb9bc9) Codate v0.1.0

Find teammates for your Toy Projects with **Codate**. You can easily find team members on VSCode Extension.

## 팀페이지 주소

2024년 27조
<https://github.com/kookmin-sw/capstone-2024-27>

## 1. 프로젝트 소개

VSCode Extension을 통하여 Side Project를 함께 진행할 사람을 간편하게 찾을 수 있는 서비스입니다.

토이 프로젝트를 시작하려고 하는 사람 혹은 다른 사람의 프로젝트에 참여해보는 경험을 쌓고 싶어하는 사람은 많지만 이러한 프로젝트를 찾는 과정은 쉽지 않습니다. 이러한 시간을 단축시키고 더 많은 토이 프로젝트가 진행되는 것을 돕고자 이 프로젝트를 진행했습니다.

많은 프로젝트들이 토이 프로젝트에서 시작해서 세상을 바꿔왔습니다. 토이 프로젝트를 통해서 더 좋은 개발자가 되어 영향력을 늘려갈 수 있다는 생각으로, 더 많은 개발자가 토이프로젝트를 더 간편하게 참여하고 시작할 수 있도록 하는 것이 저희의 목표입니다.

This project allow people to find teammates for their toy projects through VSCode Extension.

Many people want to start toy projects or gain experience by participating in other people's projects, but finding such projects is not easy. We initiated this project to reduce this time and help more toy projects get started.

A lot of major services are started as toy projects. And those projects have changed the world. We believe that toy projects can help developers improve their own skills and make some influences. Our goal is to make it easier to participate and start toy projects.

## 2. 소개 영상

<img src="https://github.com/kookmin-sw/capstone-2024-27/assets/89867182/f01242be-7c26-455f-8802-47d5ffde1d65" width="300">

## 3. 팀 소개

| 이름       | 학번     | 포지션                     | 프로필 사진                                                                                                                              | 깃허브                                                           |
| ---------- | -------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| **이승원** | 20181662 | <center>Back-end</center>  | <img src="https://github.com/kookmin-sw/capstone-2024-27/assets/89867182/5567f75a-4c3c-47b8-8fef-952a812737c4" width="120" height=auto/> | [https://github.com/KMUlee](https://github.com/KMUlee)           |
| **손동석** | 20182085 | <center>Front-end</center> | <img src="https://github.com/kookmin-sw/capstone-2024-27/assets/89867182/703dfcb4-516e-4ef6-ac8c-60c888e5bd79" width="120" height=auto/> | [https://github.com/dongseokSon](https://github.com/dongseokSon) |

## 4. How to use

Test conducted on **macOS**.

If you want to run this projext, you have to make your own server for this. There are api codes in backend branch.

- git clone <https://github.com/kookmin-sw/capstone-2024-27>
- npm install
- npm start

### Option 1. Using VSCode Extension Debugger

- npm install
- npm run build
- F5 to run Debug Mode
- Command + P > React: Start React Webview

### Option 2. Installing with VSIX package

- npm i -g vsce
- vsce package

  codate-0.1.0.vsix will be generated on the root

- Go into the Extension Marketplace on the activity bar and find "Install from VSIX"

## 5. Technology Stack

### Front-end

![R](https://shields.io/badge/react-black?logo=react&style=for-the-badge)

### Back-end

![B](https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![P](https://img.shields.io/badge/postgresql-4169e1?style=for-the-badge&logo=postgresql&logoColor=white)

### Platform

![V](https://img.shields.io/badge/Vscode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white)

### Project Management

![NO](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)

## 6. 기타

This project was bootstrapped with

- [vscode-webview-react](https://github.com/rebornix/vscode-webview-react)

- [Create React App](https://github.com/facebookincubator/create-react-app)
- [Create React App TypeScript](https://github.com/wmonk/create-react-app-typescript)
- [VSCode Extension Webview Sample](https://github.com/Microsoft/vscode-extension-samples/tree/master/webview-sample)
