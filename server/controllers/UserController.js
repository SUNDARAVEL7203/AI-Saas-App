import { Webhook } from "svix"
import userModel from "../models/userModel.js"

//API Controller  Function to manage clerk User with database

const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        await whook.verify(JSON.stringyfy(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp" : req.headers["svix-timestamp"],
            "svix-signature" : req.headers["svix-signature"]
        })

       const{data, type} = req.body

       switch(type){
        case "user.created" : {
          const userData =    {
            clerkId: data.id,
            email: data.email_addresses[0].email_addresses,
            firstName: data.first_name,
            lastName : data.last_name,
            photo : data.image_url

          }

          await userModel.create(userData)
          res.json({})
        }

        case "user.updated" : {
            const userData =    {
                email: data.email_addresses[0].email_addresses,
                firstName: data.first_name,
                lastName : data.last_name,
                photo : data.image_url
            }

            await userModel.findOneAndUpdate({clerkId: data.id}, userData)
            res.json({})
        }

        case "user.deleted" : {
           await userModel.findOneAndDelete({clerkId : data.id})
           res.json({})
        }
       }


    } catch (error) {
        console.log(error.message)
        res.json({success: false, message : error.message})
    }
}

export {clerkWebhooks}