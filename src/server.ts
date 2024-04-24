import * as grcp from "@grpc/grpc-js";
import * as grpcLoader from "@grpc/proto-loader";
import path from "path";

const protoPath = path.join(__dirname, "../protos/helloworld.proto");

const packageDefinition: grpcLoader.PackageDefinition = grpcLoader.loadSync(protoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const hello_proto: any = grcp.loadPackageDefinition(packageDefinition).helloworld;

function sayHello(call: any, callback: any) {
  callback(null, { message: "Hello " + call.request.name });
}

function main() {
  var server = new grcp.Server();
  server.addService(hello_proto.Greeter.service, { sayHello: sayHello });
  server.bindAsync("0.0.0.0:50051", grcp.ServerCredentials.createInsecure(), (err, port) => {
    if (err != null) {
      return console.error(err);
    }
    console.log(`gRPC listening on ${port}`);
  });
}

main();
