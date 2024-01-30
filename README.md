# Talking Docs: Give PDFs a Voice with AI -- Doc Talk Chat Assistant

##### Technologies Used : MERN(MongoDb,Express,React.js,Node.js),Pinecone Vector DB,Langchain framework,GooglePalm LLM

#### Dev Tools : VS Code,Github,Vercel

#### Web App Development Approach :

##### Backend :
--By using RAG(Retrieval Aumented Genration) model,I have   built the chatting app on the top of Langchain Framework.

--In it there are three steps involved in Pdf file extraction using   Loader "Pdf Parse" and for Splitting the document text into   pieces to store in Vector Db using "Recursive Character     Splitter" and for Embedding used "Google PalmEmbeddings"
  to store in "Pinecone Vector DB"
  
--Then after storing it in PineconeDB, by Querying functions    from GooglePalm LLM we can get the answers from the    document we have uploaded.

--And to store the User details Mongodb has been used as No    SQL Database.

--The Backend is Built on Express framework with Node.js runtime.


##### Frontend :
--The frontend UI is built on React.js using Javascript as programming languagage.

--In react for routing,I used package RouterDom,for notifications "React Toastify" has been used.

--Frontend app has been deployed in Vercel Hositng Website.

### Steps Required To Run Applications :

#### Frontend -React :

--"npx create-react-app ."
  For creating react app "node-modules".

--"npm install"
   For install all the depencies and packages in the "node-modules" folder.

--"npm start"
   Runs the app in the development mode.
   Open http://localhost:3000 to view it in your browser.

--"npm run build"
   Builds the app for production to the build folder. 
   It correctly bundles React in production mode and optimizes the build for the best performance.

#### Backend :

--"npm install"
     For install all the depencies and packages in the "node-modules" folder.

--"npm install --force"
    If any version conflicts use "--force" flag to  install all the depencies and packages in the "node-modules" folder.

--"node index.js"
   To start and run the server.  
   Open http://localhost:8081 to view it in your browser.

### Design Decisions & Challenges Description :

--First I choosed the OpenAI as LLM for this project but unfortunately free API test model has been discontiued,then I selected GooglePalm LLM which
   is also as popular as OpenAI for better text replies.
   
--As we need to store the data of text from Pdf in Vector format,so in this project Pinecone has been used.

--The main challenge I faced during developement is Pinecone has a limitation that Free tier account can only have One Index created.

--So, because of this when a user uploaded and analysed a file.Then he cant upload another file.To overcome this problem I used an approach to delete the
  created Index before uploading a new File.
  
--And again a problem is ,Pine cone is taking time to delete and create a new Index,in this time it is throwing error.

--For this I hava analysed the average time taken by Pinecone to delete and create Index as 20seconds.So I made a promise and In it used a setTimeout   Function of 20secs then that promise will be resolved.

--By this way I have overcome the problem in Index creation of Pinecone

### Deployed Links : Using Vercel Hosting

#### --Backend : https://talkingdocsai-backend.onrender.com/

#### --Frontend : https://talkingdocsai-frontend.vercel.app/

### Points Implemented :

#### --Frontend :
-Uploading a PDF documents
-Implement a simple chat interface to interact with the embedded PDFs
-Sign-up and Sign-in
-Host the Application

#### --Backend :
-Receive the uploaded PDFs from the front end
-Perform text extraction and vector embeddings on the content of each PDF
-Store the result of the previous step in a file or database.
-Create the APIs for text-based chat operations. The user can ask
questions and the Backend responds with the answer from the PDF.
-The API response of chat should contain the page number of the PDF from which
the answer has been provided.
-Create the APIs for the Signin/ Signup etc
-Host the Application

### Attached The Postman API Documentations : Refer Github Repository

### Video Recording Of Website Overview : Googledrive Link  - https://drive.google.com/file/d/1ffNrLmGPkofauBKb86iAod6NnRQ-f2kB/view?usp=sharing

