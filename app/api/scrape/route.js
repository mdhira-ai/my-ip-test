import { NextResponse } from "next/server";
import { PuppeteerWebBaseLoader } from "langchain/document_loaders/web/puppeteer";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { FaissStore } from "langchain/vectorstores/faiss";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
// import {} from 'hnswlib-node'


export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const url = searchParams.get("url");

  /**
   * Loader uses `page.evaluate(() => document.body.innerHTML)`
   * as default evaluate function
   **/
  const loader = new PuppeteerWebBaseLoader("https://www.tabnews.com.br/");

  const docs = await loader.load();

  //   console.log(docs[0].pageContent);

  const splitter = RecursiveCharacterTextSplitter.fromLanguage("html", {
    chunkSize: 175,
    chunkOverlap: 20,
  });

  const documents = await splitter.createDocuments([docs[0].pageContent]);

  const vectorStore = await HNSWLib.fromDocuments(
    documents,
    new OpenAIEmbeddings(),
    // {
    //   index: "Flat",
    //   indexParams: {
    //     dimension: 768,
    //     metricType: "L2",
    //   },
    // }
  );

  const results = await vectorStore.similaritySearch("hello world", {
    limit: 10,
  });

  console.log(results);

  return NextResponse.json({
    body: {
      message: "Hello from the server",
    },
  });
}
