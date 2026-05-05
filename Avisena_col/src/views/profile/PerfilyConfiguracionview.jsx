import Header from "../../layouts/Header";
import Configuracioncomponent from "../../components/Configuracioncomponent";
import Perfilydatoscomponent from "../../components/Perfilydatoscomponent";
import Profileandemailcomponent from "../../components/profileandemailcomponent";
import Cerrarsesioncomponent from "../../components/Cerrarsesioncomponent";

export default function PerfilyConfiguracionview() {
  return (
    <>
    
    <section>

        <Profileandemailcomponent/>

        <Perfilydatoscomponent/>

        <Configuracioncomponent/>

        <Cerrarsesioncomponent/>

    </section>
    </>
  )
}
