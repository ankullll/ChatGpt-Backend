const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function generateResponse(prompt){
    const response = await ai.models.generateContent({
        model:"gemini-3.6-flash",
        contents:prompt
    })

    return response.text
}


async function generateVector(prompt) {

    const response = await ai.models.embedContent({
        model: 'gemini-embedding-2',
        contents: prompt,
        config:{
            outputDimensionality:768
        }
    });

    return response.embeddings[0].values
}





module.exports = {generateResponse,generateVector};