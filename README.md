# InShelf



## Feature

- ログイン機能
    - firebase
    - ユーザを承認
- コミック管理
    - 一覧表示
    - 検索



## TODO

- [ ] v2 UX作成
- [ ] Firebase連携

    - [x] ログイン連携
    - [x] FireStore連携
    - [ ] Cloud Storage連携
- [ ] 画面実装
    - [ ] Login画面
    - [ ] Home画面
        - [ ] 本リスト一覧
            - [ ] 
            - [ ] 検索機能



## Setup

1. （必要な場合）Docker, Docker Composeをインストール

2. 以下のコマンドを実行（Reactライブラリのインストール）

```bash
sh scripts/exec.sh npm install
```

3. `app/configs/webpack/common.js` にfirebase用の環境変数を設定
4. 開発サーバの起動

```bash
docker-compose up
```

4. http://localhost:8080/ にアクセス



## Deploy

```shell
firebase deploy
```



## Else Commands

Reactライブラリインストール

```
sh scripts/exec.sh npm install --save [ライブラリ名]
```

