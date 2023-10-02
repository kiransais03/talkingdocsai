
const {PDFLoader} = require('langchain/document_loaders/fs/pdf'); //Loader
const {RecursiveCharacterTextSplitter} =  require('langchain/text_splitter') //Splitter
const {GooglePaLMEmbeddings}= require('langchain/embeddings/googlepalm')     //Embedding

//Pinecone imports
const { PineconeClient } =require("@pinecone-database/pinecone") ;
const { Document } = require("langchain/document");
const { PineconeStore } = require("langchain/vectorstores/pinecone");
const { GooglePaLM } = require("langchain/llms/googlepalm");
const { VectorDBQAChain } = require("langchain/chains");
const { Pinecone } = require('@pinecone-database/pinecone');


//--Analyse Function to extract text from pdf and add it to vectorDB with GooglePalm LLM Embeddings
const analyse =async ()=>{ 
    try {

      //Text loader from pdf
const loader = new PDFLoader('./pdfs/1696267101403_GUDURU KIRAN SAI RESUME.pdf');

const docsdata = await loader.load();

  //Splitter or Transformer
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 0,
  });
  
  const splitDocs = await textSplitter.splitDocuments(docsdata);

  //Embedding(Converting the data into LLM readable format) and store in the vector database(Pinecone)

  const embeddings = new GooglePaLMEmbeddings();

  //Pinecone vector DB add docs data in vector
  const client = new PineconeClient();
  await client.init({
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_ENVIRONMENT,
  });

  const pineconeIndex =await client.Index(process.env.PINECONE_INDEX);

  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_ENVIRONMENT,
  });

  await pinecone.deleteIndex(process.env.PINECONE_INDEX);

  await new Promise((resolve)=>{ setTimeout(()=>{resolve()},12000) })  //Delay for deleting the old index and creating new index
  
    await pinecone.createIndex({
      name: process.env.PINECONE_INDEX,
      dimension: 768,
      metric:"cosine",
    });
    
    const vectorStore = await PineconeStore.fromDocuments(splitDocs, embeddings, {
      pineconeIndex,
      maxConcurrency: 5, // Maximum number of batch requests to allow at once. Each batch is 1000 vectors.
    });

    console.log("hello this ")

    return ;
    }
    catch(error) {
        return ["ERROR",error.message,error];
    }

}


//--Queryfromuser function to get the LLM response by chaining the vectorDB to GooglePalmLLM

const queryfromuser = async (query)=>{
  try {

     //Pinecone vector DB get data in vector
  const client = new PineconeClient();
  await client.init({
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_ENVIRONMENT,
  });
  const pineconeIndex = client.Index(process.env.PINECONE_INDEX);

  
const vectorStore = await PineconeStore.fromExistingIndex(
  new GooglePaLMEmbeddings(),
  { pineconeIndex }
);
    
const model = new GooglePaLM();
const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
  k: 1,
  temperature: 4,
  returnSourceDocuments: true,
});

const response = await chain.call({ query:`${query}`});
// console.log(response);
return response; 
  }
  catch(error) {
    return ["ERROR",error.message,error];
  }
}

module.exports = {analyse,queryfromuser};