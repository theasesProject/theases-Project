module.exports = (DataTypes,connection)=>{
    const Media= connection.define('Media',{
    media:{
        type:DataTypes.STRING,
        allowNull:false
    }
    
    });
    return Media
    }