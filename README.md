# InShelf

**私的利用の範囲における書籍共有アプリ**

```
「InShelf」は友人や家族と簡単に共有本棚を作ることができるアプリです。
あなたが欲しい本、カートに入れる前にちょっと待って。まずはInShelfで検索してみましょう。友人が既に本棚に入れているかもしれません。InShelfでは友人や家族間で同じ本を二度買ってしまうのを防ぐことができます。
```

```
「InShelf」は少数人用の完全会員制アプリです。管理者は面識のある友人や家族を招待するようにしましょう。面識のない人間や会社、不特定多数と本棚を共有することは違法行為とみなされる可能性が非常に高いので絶対にやめましょう。
```



## Preparation

1. [Firebaseプロジェクトの用意](https://github.com/CyberAgent/dews-general-annotation-tool/wiki/1.-Firebase%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%81%AE%E7%94%A8%E6%84%8F)

2. `.env.example` を参考に `.env`を設定
    - REACT_APP_* 系
        - 「Firebaseプロジェクト > 設定 > 全般 > マイアプリ > Firebase SDK snippet > 構成」 から取得可能
        -  [このノートブック](https://colab.research.google.com/drive/1CRvpSB334s8v1Cyx9pAhSI-FoVNGG2uB?usp=sharing)で楽に整形できます
    - FIREBASE_TOKEN は `firebase login:ci ` で取得



## Dev Setup

1. （必要な場合）Docker, Docker Composeをインストール

2. 以下のコマンドを実行（Reactライブラリのインストール）

```bash
sh bin/exec.sh "npm install --unsafe-perm=true --allow-root"
```

3. `app/configs/webpack/common.js` にfirebase用の環境変数を設定
4. 開発サーバの起動

```bash
docker-compose up
```

4. http://localhost:8080/ にアクセス



## Deploy

事前に[firebaseのtokenを取得](https://firebase.google.com/docs/cli?hl=ja#cli-ci-systems)し、 `.env` の `FIREBASE_TOKEN` に設定しておく

```shell
. bin/exec.sh "yarn deploy"
```



## Else Commands

React パッケージインストール

```
. bin/exec.sh npm install --save [パッケージ名]
```

アップデート

```
. bin/exec.sh npm update [パッケージ名]
```

Firebase Index Export

```shell
. bin/exec.sh "firebase firestore:indexes > firestore.indexes.json"
```

