module.exports = (DataTypes,connection)=>{

const Admin= connection.define('Admin',{
    firstName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false},
    phoneNumber:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    dateOfBirth:{
        type:DataTypes.DATE ,
        allowNull:false
    },
    avatar:{

        type:DataTypes.STRING,
        allowNull:false
    }
    ,
    role:{
        type:DataTypes.STRING,
        defaultValue:"Admin"
    }
    
    
    });
    return Admin}
    