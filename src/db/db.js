import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  clerkId: {type: String},
  username: {type: String},
  email: {type: String},
  password: {type: String},
  image: {type: String}
})

const productSchema = new mongoose.Schema({
  category: {type: String},
  time: {type: String},
  title: {type: String},
  description: {type: String},
  image: {type: String},
  price: {type: String}
})

const orderSchema = new mongoose.Schema({
  user: {type: String},
  productId: {type: String},
  amount: {type: String},
})

const chatSchema = new mongoose.Schema({
  reciever: {type: String},
  sender: {type: String},
  message: {type: String}
})

export const User = mongoose.models.User || mongoose.model("User", userSchema)
export const Product = mongoose.models.Product || mongoose.model("Product", productSchema)
export const Order = mongoose.models.Order || mongoose.model("Order", orderSchema)
export const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema)


// database methods


const connectDB = async () => {
   await mongoose.connect(process.env.MONGODB_URI)
   console.log("MongoDB connected")
}

await connectDB()


export const addUser = async ({ clerkId, username, email, password, image }) => {
  const user = new User({ clerkId, username, email, password, image })
  try {
    await user.save()
    return 'success'
  } catch (err) {
    return `Error: Failed to add user: ${err}`
  }
}

export const addProduct = async ({ title, time, category, description, image, price }) => {
  const product = new Product({ title, time, category, description, image, price })
  try {
    await product.save()
    return 'success'
  } catch (err) {
    return `Error: Failed to add product ${err}`
  }
}

export const addOrder = async ({ user, productId, amount }) => {
  const order = new Order({ user, productId, amount })
  try {
    await order.save()
    return 'success'
  } catch (err) {
    return `Error: Failed to add Order ${err}`
  }
}

export const addChat = async ({ sender, reciever, message }) => {
  const chat = new Chat({ sender, reciever, message })
  try {
    await chat.save()
    return 'success'
  } catch (err) {
    return `Error: Failed to add chat ${err}`
  }
}

