# BookRadar

## Documents
Figma: https://www.figma.com/design/BxjMpTsyuoEbDSISjrDV31/BookRadar?node-id=0-1&p=f&t=hhtrdZXDsm9gmyHS-0 

---

## 終端機執行指令

#### 前端終端機
```
- cd BookRadar/frontend
- npm install
- npm run dev
```

#### 後端終端機
```
- cd BookRadar/backend
- pip install -r requirements.txt
- python manage.py migrate
- python manage.py runserver
    - 這裡會出現url，沒意外的話應該長'http://127.0.0.1:8000'
```




---

## 註冊/登入/登出說明
- 當登入時，系統會生成：一個 access token（30分鐘有效）、一個 refresh token（1天有效）
    - 30分鐘內使用同一個 access token
    - 1天內同個帳號不用重新登入，使用同一個 refresh token（沒登出的情況下一直處於登入狀態）
    - 1天後要重新登入取得新的 access, refresh token
- 在沒有登入的情況下沒辦法切換到 home page，會自動導向 login page