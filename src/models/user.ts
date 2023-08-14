import mongoose, {Schema,Document,Model} from 'mongoose'

interface IUser extends Document{
    name: string;
    email: string;
    passwordHash:string;
    isAdmin:boolean;
}
const userSchema: Schema<IUser>=new Schema({
    name:{
        type:String,
        default:''
    },
    passwordHash:{
        type: String,
        default: ''
    },
    email:{
        type: String,
        default: ''
    },
    isAdmin:{type: Boolean}
})

userSchema.virtual('id').get(function(this:Document){
    return this._id.toHexString();
})
userSchema.set('toJSON', {
    virtuals:true,
})

export const User:Model<IUser>=mongoose.model('Users',userSchema);
export default userSchema;

