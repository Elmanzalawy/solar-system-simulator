import * as THREE from 'three';
import { image } from '../util';
import atmosphereVertexShader from '../../assets/shaders/atmosphereVertex.glsl'
import atmosphereFragmentShader from '../../assets/shaders/atmosphereFragment.glsl'

class Solarbody{
    constructor(options){
        this.type = options.type ?? "solarbody";
        this.sphereGeometry = options?.geometry ?? new THREE.SphereGeometry(1, 64, 64);
        this.material = options?.material ?? new THREE.MeshStandardMaterial({
            map: new THREE.TextureLoader().load(image(options.textureImage))
        });
        this.solarbody = new THREE.Mesh(this.sphereGeometry, this.material);
        this.object = new THREE.Object3D();
        this.object.add(this.solarbody);

        if(options.position){
            this.object.position.x = options.position.x;
            this.object.position.y = options.position.y;
            this.object.position.z = options.position.z;
        }
        
        if(options.scale){
            this.solarbody.scale.set(options.scale, options.scale, options.scale); 
        }

        if(options.orbit){
            this.orbit = options.orbit;
            this.solarbody.position.x += this.orbit.orbitDistance.x;
            this.solarbody.position.y += this.orbit.orbitDistance.y;
            this.solarbody.position.z += this.orbit.orbitDistance.z;
            
            this.object.position.x = this.orbit.solarbody.position.x;
            this.object.position.y = this.orbit.solarbody.position.y;
            this.object.position.z = this.orbit.solarbody.position.z;
        }

        if(options.hasAtmosphere){
            this.createAtmosphere();
        }

        options.scene.add(this.object);
    }

    createAtmosphere(){
        //create atmosphere
        const atmosphere = new THREE.Mesh
        (
            new THREE.SphereGeometry(0.9,50,50),
            new THREE.ShaderMaterial({
                vertexShader: atmosphereVertexShader,
                fragmentShader: atmosphereFragmentShader,
                blending: THREE.AdditiveBlending,
                side: THREE.BackSide
            })
        )
        atmosphere.scale.set(1.1, 1.1, 1.1)
        this.solarbody.add(atmosphere)     
    }

    update(){
        if(this.orbit){
            this.object.rotation.y += this.orbit.orbitalVelocity ?? 0;
        }
        this.solarbody.rotation.y += 0.003;
    }
}
export{
    Solarbody
}