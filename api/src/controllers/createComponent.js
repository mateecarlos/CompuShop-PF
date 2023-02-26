const Components = require('./../models/components.js');
const Motherboards = require('./../models/motherboard.js');
const CPUs = require('./../models/CPU.js');
const RAMs = require('./../models/RAM.js');
const GPUs = require('./../models/GPU.js');
const Storages = require('./../models/storage.js');
const PSUs = require('./../models/PSU.js')

const createComponent = async data => {
    console.log(data)
    if(!data.name) throw 'Atributo «Nombre» es requerido';
    if(!data.category) throw 'Atributo «Categoría» es requerido';
    if(!data.price) throw 'Atributo «Precio» es requerido';
    if(!data.description) throw 'Atributo «Descripción» es requerido';
    //const component = new Components(data);
    const savedComponent = await component.save();
    return savedComponent;
}
const newCreateComponent = async data => {
    console.log(data);
    if(!data.manufacturer) throw 'El atributo «manufacturer» es requerido';
    if(!data.name) throw 'El atributo «name» es requerido';
    if(!data.category) throw 'El atributo «category» es requerido';
    if(!data.price) throw 'El atributo «price» es requerido';
    const component = new Components()
    switch(data.category){
        case 'motherboard':
            component.schema.add(Motherboards.schema);
            component.overwrite(data);
            break;
        case 'CPU':
            component.schema.add(CPUs.schema);
            break;
        case 'RAM':
            component.add(auxRAM(data));
            break;
        case 'GPU':
            component.add(auxGPU(data));
            break;
        case 'storage':
            component.add(auxStorage(data));
            break;
        case 'case':
            console.log('*no hace nada*')
            break;
        case 'PSU':
            component.add(auxPSU(data));
            break;
        default:
            throw 'Aún no contamos con esa categoría; crea una o revisa tu ortografía';
    }
    //const savedComponent = await component.save();
    console.log(5)
    console.log(component)
    const savedComponent = await component.save()
    return savedComponent;
}

const auxMotherboard = data => {
    if(!(data.cpu === 'AMD' || data.cpu === 'Intel')) throw 'Actualmente solo trabajamos con procesadores AMD e Intel';
    const motherboard = new Motherboards({
        cpu: data.cpu,
        chipset: data.chipset,
        socket: data.socket,
        memory: data.memory,
        maxGraphics: data.maxGraphics,
        form: data.form
    })
    return true;
}
const auxCPU = data => {
    const cpu = new CPUs({
        socket: data.socket,
        chipset: data.chipset,
        memory: data.memory
    })
    return cpu;
}
const auxRAM = data => {
    const ram = new RAMs({
        type: data.type,
        capacity: data.capacity,
        frequency: data.frrequency
    })
    return ram;
}
const auxGPU = data => {
    const gpu = new GPUs({
        memory: data.memory
    });
    return gpu;
}
const auxStorage = data => {
    const storage = new Storages({
        type: data.type,
        capacity: data.capacity
    });
    return storage;
}
const auxPSU = data => {
    const psu = new PSUs({
        watts: data.watts,
        form: data.form
    });
    return psu;
}

module.exports = {createComponent, newCreateComponent}