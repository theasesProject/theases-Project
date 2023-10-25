module.exports = (sequelize,DataTypes,connection)=>{
    const CarMedia= connection.define('CarMedia',{
    media:{
        type:DataTypes.STRING,
        allowNull:false
    }
    
    });
    return CarMedia
    }