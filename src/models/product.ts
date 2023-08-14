import mongoose, {Schema,Document,Model} from "mongoose";
interface IProduct extends Document{
    name: String,
    description: String,
    richDescription: string;
}
const productSchema: Schema<IProduct>=new mongoose.Schema({
    name:{
        type:String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    richDescription:{
        type: String,
        default:''
    }
})

productSchema.virtual('id').get(function(this:Document){
    return this._id.toHexString();
})
productSchema.set('toJSON', {
    virtuals:true,
})

export const Product:Model<IProduct>=mongoose.model('User',productSchema);
