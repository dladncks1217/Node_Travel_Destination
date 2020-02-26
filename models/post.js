module.exports = (sequelize,DataTypes)=>(
    sequelize.define('post',{
        content:{
            type:DataTypes.STRING(140),
            allowNull:false,
        },
        place:{
            type:DataTypes.STRING(10),
            allowNull:false,
        },
        nick:{
            type:DataTypes.STRING(20),
            allowNull:false,
        }
    })
);