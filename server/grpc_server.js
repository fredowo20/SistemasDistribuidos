const {Pool} = require('pg')

const pool = new Pool({
  user: 'sisdis', 
  host: process.env.POSTGRES_HOST,
  database: 'sisdb', 
  password: 'sispass', 
  port: 5432, //3211 por si no funciona xd
})

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = "./example.proto";

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const itemProto = grpc.loadPackageDefinition(packageDefinition);

const server = () => {
  const server = new grpc.Server();
  server.addService(itemProto.ItemService.service, {
    getItem: (_, callback) => {
      const itemName = _.request.name;
      async function item(){
        const item = await pool.query("SELECT * FROM items WHERE name::text LIKE '%"+itemName+"%';");
        return item;
      }

      item().then(val => callback(null, { items: val.rows}));
    }
  });
  server.bindAsync(process.env.SERVER_HOST+":50051", grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err != null) console.log(err);
    else {
      console.log("GRPC SERVER RUN AT http://localhost:50051");
      server.start();
    }
  });
};

server();