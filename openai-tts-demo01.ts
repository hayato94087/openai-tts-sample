import 'dotenv/config'

// ファイルシステムを扱うためのモジュール
import fs from "fs";

// ファイルパスを扱うためのモジュール
import path from "path";

// OpenAI SDKをインポート
import { OpenAI } from "openai";

// OpenAI SDKのインスタンスを生成
const openai = new OpenAI();

// OpenAI APIを利用してテキストから音声を生成する
const speechFile = path.resolve("./speech-demo01.mp3");

async function main() {
  // OpenAI APIを利用してテキストから音声を生成
  const mp3 = await openai.audio.speech.create({
    // モデルの指定
    model: "tts-1",
    // ボイスの指定
    voice: "alloy",
    // テキストの指定
    input: "Today is a wonderful day to build something people love!",
  });
  // ファイルパスを表示
  console.log(speechFile);
  // バッファをファイルに書き込む
  const buffer = Buffer.from(await mp3.arrayBuffer());
  // ファイルに書き込む
  await fs.promises.writeFile(speechFile, buffer);
}

// メイン関数を実行
main();