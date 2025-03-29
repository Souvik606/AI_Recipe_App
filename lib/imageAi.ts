import axios from "axios";

const BASE_URL='https://aigurulab.tech';

const generateImage =async(prompt:string)=>{
    try{
        console.log(prompt);
        const result=await axios.post(BASE_URL+'/api/generate-image',
            {
                width: 1024,
                height: 1024,
                input: prompt,
                model: 'sdxl',
                aspectRatio:"1:1"
            },
            {
                headers: {
                    'x-api-key': process.env.EXPO_PUBLIC_IMAGE_API_KEY,
                    'Content-Type': 'application/json',
                },
            })
        return result.data.image;
    }catch(error){
        console.log("Error while creating image from prompt:",error)
    }
}

export default generateImage;