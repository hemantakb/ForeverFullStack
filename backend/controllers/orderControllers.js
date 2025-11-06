// import { currency } from "../../admin/src/App.jsx";
import orderModel from "../model/orderModel.js";
import userModel from "../model/userModel.js";
import Stripe from "stripe";
import razorpay from 'razorpay'

const currency = "inr";
const delivery_fee = 10;

//intailize the payment gateways
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


console.log('Key ID:', process.env.RAZORPAY_KEY_ID)
    console.log('Key Secret:', process.env.RAZORPAY_KEY_SECRET)

const rozarpayInstance=new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})

const placeOrder = async (req, res, next) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now().toString(),
    };
    const newOrder = await orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.status(201).json({
      success: true,
      message: "Order Placed ",
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};
const placeOrderStripe = async (req, res, next) => {
  try {
    const { userId, items, address, amount } = req.body;
    const { origin } = req.headers;

    let orderData = {
      userId,
      items,
      paymentMethod: "Stripe",
      payment: false,
      address,
      amount,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: delivery_fee * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};
const verifyStripe = async (req, res, next) => {
  try {
    const { userId, orderId, success } = req.body;
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({
        success: true,
      });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
const placeOrderRozarpay = async (req, res, next) => {
  
     try {
         const { userId, items, address, amount } = req.body;
   

    let orderData = {
      userId,
      items,
      paymentMethod: "Razorpay",
      payment: false,
      address,
      amount,
      date: Date.now(),
    };

    const newOrder =new orderModel(orderData);
    await newOrder.save();

     const option={
        amount:amount*100,
        currency:currency.toUpperCase(),
       receipt:newOrder._id.toString()

     }
const order = await rozarpayInstance.orders.create(option);

    res.json({
      success: true,
      order,
    });
//   await rozarpayInstance.orders.create(option,(error,order)=>{
//         if(error){
//             console.log(error);
//            return res.json({message:error.message,success:false})
            
//         }
//         res.json({
//             success:true,
//             order
//         })
//      })

     } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
        
     }



};

const verifyRozarpay= async  (req, res) => {
  try {
    const { userId, razorpay_order_id } = req.body;
    const orderInfo = await rozarpayInstance.orders.fetch(razorpay_order_id);
    if(orderInfo.status==='paid'){
        await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({
            success:true,
            message:"Payment successfull"
        })
    }else{
        res.json({
            success:false,
            message:"Payment failed"
        })
    }
  } catch (error) {
    // Handle error
     res.json({
      success: false,
      message: error.message,
    });
  }
}
const allOrder = async (req, res, next) => {
  try {
    const orders = await orderModel.find({});
    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
const userOrder = async (req, res) => {
  const { userId } = req.body;

  try {
    const order = await orderModel.find({ userId });
    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const updateStatus = async (req, res, next) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({
      success: true,
      message: "Update succesully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export {
  userOrder,
  placeOrder,
  placeOrderStripe,
  placeOrderRozarpay,
  allOrder,
  updateStatus,
  verifyStripe,
  verifyRozarpay
};
