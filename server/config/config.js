const config = {
    production:{
        SECRET: process.env.SECRET,
    },
    default:{
        SECRET: 'SUPERSECRETPASSWORD123',
    }
}

exports.get = function get(env){
    return config[env] || config.default 
}