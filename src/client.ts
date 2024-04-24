import * as grcp from "@grpc/grpc-js";
import * as grpcLoader from "@grpc/proto-loader";
import path from "path";
import { argv } from "process";

const protoPath = path.join(__dirname, "../protos/helloworld.proto");

const packageDefinition: grpcLoader.PackageDefinition = grpcLoader.loadSync(protoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const hello_proto: any = grcp.loadPackageDefinition(packageDefinition).helloworld;

function main() {
  const target = "localhost:50051";
  const client = new hello_proto.Greeter(target, grcp.credentials.createInsecure());
  const user = argv[2] || "world";
  client.sayHello({ name: user }, (err: Error, res: any) => {
    console.log("Greeting:", res.message);
  });
}

main();
