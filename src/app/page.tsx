import Button from "@/components/button/Button";
import Link from "next/link";

export default function HomePage() {


  return (
    <div className="py-28 px-20">
      <div className="BienvenidaDesktop grid grid-cols-2 w-full h-96 px-24 py-20 bg-white rounded-3xl">
        <div className="Frame154 col-span-1 self-stretch justify-start items-center gap-28 inline-flex">
          <div className="Frame153 flex-col justify-start items-start gap-8 inline-flex">
            <div className="Frame151 flex-col justify-start items-start gap-4">
              <div className="TeDamosLaBienvenida w-96 text-alabaster-700 text-5xl font-bold font-['Rubik'] leading-10">
                Te damos la bienvenida 👋{" "}
              </div>
              <div className="ComienzaAGestionarTusTurnosDeFormaEficienteYOrdenada w-96 text-alabaster-500 text-lg font-normal font-['Rubik'] leading-7">
                Comienza a gestionar tus turnos de forma eficiente y ordenada.
              </div>
            </div>
            <div className="Frame152 flex-col justify-start items-start gap-4 flex">
              <Button text="Registrarme" type="submit" disabled={false} />
              <div className="Frame146 flex-col justify-start items-center gap-2 flex">
                <div className="YaTienesCuenta w-96 text-center text-alabaster-500 text-base font-normal font-['Rubik'] leading-normal cursor-pointer">
                  ¿Ya tienes cuenta?
                </div>
                <Link
                  href="/auth/login"
                  className="Text self-stretch text-center text-primary-800 text-base font-medium font-['Rubik'] leading-normal cursor-pointer"
                >
                  Iniciar sesión
                </Link>
              </div>
            </div>
          </div>
          <div
            className="bg-cover bg-center h-96 rounded-3xl"
            style={{ backgroundImage: 'url("/assets/img/welcome_image.png")' }}
          >
            <div className="LogotipoWhite w-72 h-14 relative flex-col justify-start items-start flex " />
          </div>
        </div>
      </div>
    </div>
  );
}
