module.exports = (sequelize,DataTypes,connection)=>{

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
        type:DataTypes.Date,
        allowNull:false
    },
    avatar:{

        type:DataTypes.STRING,
        allowNull:false
    }
    ,
    type:{
        type:DataTypes.STRING,
        defaultValue:"Admin"
    }
    
    
    });
    return Admin}
    