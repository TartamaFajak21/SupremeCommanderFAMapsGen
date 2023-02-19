import { useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2'

export default function Form({modalStatus}){
  const [playerNumber, setPlayerNumber] = useState("6");
  const [maptogen, setMapToGen] = useState("1");
  const [mapsize, setMapSize] = useState("512");

  const generateMap = async () => {
    modalStatus(false);
    Swal.fire({
      title: 'Per piacere attendi',
      html: 'Generazione mappa...',
      allowOutsideClick: false,
      showConfirmButton: false,
    })
    Swal.showLoading();
    const formData = new FormData();
    formData.append("maxPlayer", playerNumber);
    formData.append("mapNumber", maptogen);
    formData.append("mapSize", mapsize);
    const axiosUpload = await axios.post(
      "https://supcomserver.icrack-games.com/",
      formData,
    ).then((response) => {
      Swal.close();
      const { data } = response;
      const maps = data[0].mappe_generate;
      if(parseInt(maptogen)>1){
        const multipleMaps = []
        for (let index = 0; index < maptogen; index++) {
          const element = maps[index];
          multipleMaps.push(element)
        }
        const mapsHTML = multipleMaps.map(mapData =>
          `
          <div class="my-3">
          <img src="${mapData.immagine_mappa}" style="width: 460px; height: 460px;">
          <a class="swal2-title" href="${mapData.download_url}" target="_blank">Scarica Mappa</a>
          </div>
          <hr>
          `
        ).join('');
        Swal.fire({
          html: mapsHTML,
          confirmButtonText: "Chiudi",
        })
      }
      else{
        Swal.fire({
          title: `<a href="${maps[0]["download_url"]}">Scarica Mappa</a>`,
          imageUrl: `${maps[0]["immagine_mappa"]}`,
          imageWidth: "460px",
          imageHeight: "460px",
          confirmButtonText: "Chiudi",
        })
      }
    }).catch((err) => {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Errore durante la generazione della mappa!',
      })
    });
  }

    return (
        <>
            <div className="relative p-6 flex-auto">
            <div className="mb-3 pt-0">
                <label id="teamsize">Numero Giocatori : </label>
                <input type="number" id="teamsize" onChange={(e)=>setPlayerNumber(e.target.value)} min="2" max="16" value={playerNumber} placeholder="Numero Max di Player..." className="px-3 py-4 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full" />
            </div>
            <div className="mb-3 pt-0">
                <label id="mapnumber">Numero Mappe da generare : </label>
                <input type="number" id="mapnumber" onChange={(e)=>setMapToGen(e.target.value)} min="1" max="10" value={maptogen} placeholder="Mappe da Generare..." className="px-3 py-4 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full" />
            </div>
            <div className="mb-3 pt-0">
                <label id="mapsize">Dimensioni Mappa : </label>
                <input type="number" id="mapsize" onChange={(e)=>setMapSize(e.target.value)} min="128" max="1024" value={mapsize} placeholder="Dimensioni Mappa" className="px-3 py-4 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full" />
            </div>
            </div>
            <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => modalStatus(false)}
                  >
                    Annulla
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit" onClick={generateMap}
                  >
                    Genera Mappa
                  </button>
                </div>
        </>
    )
}