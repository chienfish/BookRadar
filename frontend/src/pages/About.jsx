import { useState, useEffect } from "react";
import api from "../api";
import Bar from "../components/Bar";
import "../styles/About.css"; 
import React from "react";


function About() {
    const members = [
      {
        name: "黃宇呈",
        role: "財金一",
        description: "主要任務：前端開發",
        weeks: [
          "UI 畫面切版",
          "專案文書資料管理",
        ],
        avatar: `${import.meta.env.BASE_URL}avatars/founder1.png`,
      },
      {
        name: "游峻安",
        role: "哲學二",
        description: "主要任務：爬蟲程式",
        weeks: [
          "完成爬蟲模組",
          "提供測試資料與整合",
        ],
        avatar: `${import.meta.env.BASE_URL}avatars/founder2.png`,
      },
      {
        name: "林芊妤",
        role: "工海碩一",
        description: "主要任務：全端開發與資料庫設計",
        weeks: [
          "設計後端架構與前端 UI",
          "資料爬蟲、API 設計與系統整合",
          "前後端測試與部署",
        ],
        avatar: `${import.meta.env.BASE_URL}avatars/founder3.png`,
      },
    ];
  
    return (
      <div>
        <Bar />
        <div className="about-container">
          <div className="about-header">
            <div>
                <h1 className="project-title">找書雷達 BookRadar</h1>
            </div>
          </div>
  
          <section className="about-content-row">
            <div className="about-section">
                <h2>專案介紹</h2>
                <p>
                開發一個整合「線上書店價格」與「圖書館的館藏狀況」的資訊查詢系統。使用者輸入書名或 ISBN，即可獲得：
                </p>
                <ul>
                <li>線上書店的比價<strong>（博客來、誠品、金石堂）</strong></li>
                <li>哪些圖書館可借閱該書<strong>（國資圖、台北市立圖書館）</strong></li>
                <li>是否建議購買或借書</li>
                </ul>
                <p>
                本專案以 Python 為主，整合爬蟲技術、API 使用、後端設計與前端的介面呈現，協助學生或讀者節省時間與成本。
                </p>
            </div>

            <div className="about-logo-container">
                <img src={`${import.meta.env.BASE_URL}bookradar-logo.png`} alt="BookRadar logo" className="about-logo" />
            </div>
            </section>
  
          <section className="about-section">
            <h2>成員介紹</h2>
            <div className="member-cards">
              {members.map((m, idx) => (
                <div key={idx} className="member-card">
                  <img src={m.avatar} alt={`${m.name} avatar`} className="founder-img" />
                  <h3>{m.name}&nbsp;{m.role}</h3>
                  <p><strong>{m.description}</strong></p>
                  <div>
                    {m.weeks.map((w, i) => (
                      <p key={i}>{w}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }
  
  export default About;
  