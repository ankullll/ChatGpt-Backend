const { Pinecone } = require('@pinecone-database/pinecone')

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const cohortChatGptIndex =pc.index('cohort-chat-gpt')


async function createMemory({vectors,metadata,messageId}) {
  

 await cohortChatGptIndex.upsert(
  {records:[
    {
      id: String(messageId),
      values: vectors,
      metadata: {
        chat: String(metadata.chat),
        user: String(metadata.user),
        text: String(metadata.text),
      },
    },
  ]}
);

}

async function queryMemory({queryVector,limit=5,metadata}) {
  const data = await cohortChatGptIndex.query({
    vector:queryVector,
    topK:limit,
    filter:metadata?metadata:undefined ,
    includeMetadata:true

  })

  return data.matches
}


module.exports = {createMemory,queryMemory}