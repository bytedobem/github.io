/*=============================================================
Projeto......: ByteDoBem
Aplicativo...: Evangelho365
Modulo.......: evangelho365.js
Objetivo.....: Javascript do Evangelho365 - LEITURA
===============================================================
Vrs001-13/11/2017-Nivaldo-Implantação.
=============================================================*/
console.log("leit.js> *** Executando leitura.js ***");


/*======================================================
                CARGA DA PAGINA LEITURA
======================================================*/

/*--------------------------------*/
function le_preparaPaginaLeitura() {
/*--------------------------------*/
console.log("leit.js> *** Executando le_preparaPaginaLeitura() ***");
    
   // Carregar ev_dtInicLeit         ---> ACERTAR
   //          ev_arrayLidas


    console.log("leit.js> =======<<<  PREPARA PAGINA LEITURA  >>>=======");
    console.log("leit.js> ev_dtInicLeit.: " + ev_dtInicLeit);
    console.log("leit.js> ev_numLeit....: " + ev_numLeit);
    console.log("leit.js> ev_numHoje....: " + ev_numHoje);
    console.log("leit.js> ev_numPend....: " + ev_numPend);
    console.log("leit.js> ----------------------------------------");
    console.log("leit.js> ev_arrayLidas.: " + ev_arrayLidas[ev_numLeit]);
    console.log("leit.js> ev_dtHoje.....: " + ev_dtHoje);
    console.log("leit.js> ev_arrayDatas.: " + ev_arrayDatas[ev_numLeit]);
    console.log("leit.js> =================================================");
   

};


/*--------------------------------*/
function le_carregaPaginaLeitura() {
/*--------------------------------*/
console.log("leit.js> *** Executando le_carregaPaginaLeitura() ***");

    /*-- Get do Navbar Top --*/
    pe_getaNavbarTop( "Leitura" , "page" );

    /*-- Get do Corpo da Pagina --*/
    pe_getaHtmlPagina( "" , "leitura" ); 

    /*-- Get do Navbar Bottom --*/
    pe_getaNavbarBottom( "leitura" );

};


/*------------------------------*/
function le_trataPaginaLeitura() {
/*------------------------------*/
console.log("leit.js> *** Executando le_trataPaginaLeitura() ***");

    console.log("leit.js> =======<<<  TRATA PAGINA LEITURA  >>>=======");
    console.log("leit.js> ev_dtInicLeit.: " + ev_dtInicLeit);
    console.log("leit.js> ev_numLeit....: " + ev_numLeit);
    console.log("leit.js> ev_numHoje....: " + ev_numHoje);
    console.log("leit.js> ev_numPend....: " + ev_numPend);
    console.log("leit.js> ----------------------------------------");
    console.log("leit.js> ev_arrayLidas.: " + ev_arrayLidas[ev_numLeit]);
    console.log("leit.js> ev_dtHoje.....: " + ev_dtHoje);
    console.log("leit.js> ev_arrayDatas.: " + ev_arrayDatas[ev_numLeit]);
    console.log("leit.js> =================================================");


    $("#id_dataLeitura").text( "Leitura indicada para o dia " + ev_arrayDatas[ev_numLeit] );

    $("#id_nomeEvangelho").text( le_recuperaNomeEvangelho() );

    $("#id_versLeitura").text( le_recuperaVersicLeitura() );

    $("#id_textoLeitura").html("<div>Leitura recuperada...</div>");


    
};


/*======================================================
                  BOTAO LISTA LEITURAS
======================================================*/

/*----------------------------*/
function le_btnListaLeituras() {
/*----------------------------*/
console.log("leit.js> *** Executando le_btnListaLeituras() ***");

    /*-- Get do Navbar Top --*/
    pe_getaNavbarTop( "Lista Leituras" , "page" );

    /*-- Get do Corpo da Pagina --*/
    pe_getaHtmlPagina( "" , "lista" ); 

    /*-- Get do Navbar Bottom --*/
    pe_getaNavbarBottom( "home" );


};


/*-----------------------------------------*/
function le_btnClikListaLeitura( nLeitura ) {
/*-----------------------------------------*/
console.log("leit.js> *** Executando le_btnbtnClikListaLeitura(" + nLeitura + ") ***");

    ev_numLeit = nLeitura;
    le_carregaPaginaLeitura();

};


/*======================================================
                BOTAO LEITURA ANTERIOR
======================================================*/

/*------------------------------*/
function le_btnLeituraAnterior() {
/*------------------------------*/
console.log("leit.js> *** Executando le_btnLeituraAnterior() ***");

    if ( ev_numLeit > 1 ) {
        ev_numLeit -= 1;
        le_carregaPaginaLeitura();
    } else {
        console.log("leit.js> Já é o primeiro DIA");
    };

};


/*======================================================
                 BOTAO PROXIMA LEITURA
======================================================*/

/*-----------------------------*/
function le_btnProximaLeitura() {
/*-----------------------------*/
console.log("leit.js> *** Executando le_btnProximaLeitura() ***");

    if ( ev_numLeit < 365 ) {
        ev_numLeit += 1;
        le_carregaPaginaLeitura();
    } else {
        console.log("leit.js> Já é o último DIA");
    };

};


/*======================================================
                 BOTAO PESQUISA LEITURA
======================================================*/

/*------------------------------*/
function le_btnPesquisaLeitura() {
/*------------------------------*/
console.log("leit.js> *** Executando le_btnPesquisaLeitura() ***");

    /*-- Get do Navbar Top --*/
    pe_getaNavbarTop( "Pesquisa" , "page" );

    /*-- Get do Corpo da Pagina --*/
    pe_getaHtmlPagina( "" , "pesquisa" ); 

    /*-- Get do Navbar Bottom --*/
    pe_getaNavbarBottom( "home" );

};


/*---------------------------*/
function le_btnPesquisaHoje() {
/*---------------------------*/
console.log("leit.js> *** Executando le_btnPesquisaHoje() ***");

    ev_numLeit = ev_numHoje;
    le_carregaPaginaLeitura();

};


/*-------------------------------*/
function le_btnPesquisaPendente() {
/*-------------------------------*/
console.log("leit.js> *** Executando le_btnPesquisaPendente() ***");

    ev_numPend = 7;     // ACERTAR


    ev_numLeit = ev_numPend;
    le_carregaPaginaLeitura();

};


/*--------------------------------*/
function le_btnPesquisaInformado() {
/*--------------------------------*/
console.log("leit.js> *** Executando le_btnPesquisaInformado() ***");

    var nLeit = 9;    // ACERTAR

    ev_numLeit = nLeit;
    le_carregaPaginaLeitura();

};


/*======================================================
                CHECK MARCA/DESMARCA LIDA
======================================================*/

/*-------------------------------*/
function le_btnCheckLeituraLida() {
/*-------------------------------*/
console.log("leit.js> *** Executando le_btnCheckLeituraLida() ***");

// ACERTAR => Para gravar na session e para o usuario o marcação da leitura
console.log("leit.js> Clicou no Check(antes)...: " + ev_arrayLidas[ev_numLeit]);

    if ( ev_arrayLidas[ev_numLeit] == "N" ) {
        ev_arrayLidas[ev_numLeit] = "S";
        $( "#id_iconCheckLeitura" ).attr( "src" , "icon/ic_check_box_white_24dp_2x.png" ); 
    } else {
        ev_arrayLidas[ev_numLeit] = "N";
        $( "#id_iconCheckLeitura" ).attr( "src" , "icon/ic_check_box_outline_blank_white_24dp_2x.png" ); 
    };
console.log("leit.js> Clicou no Check(depois)..: " + ev_arrayLidas[ev_numLeit]);

};


/*======================================================
             FUNCOES AUXILIARES DA LEITURA
======================================================*/

/*---------------------------------------------*/
function le_converteLidasEmArray( stringLidas ) {
/*---------------------------------------------*/
console.log("leit.js> *** Executando le_converteLidasEmArray() ***");

    var arrayLidas = new Array();

    for (i = 0; i <= 365; i++) {
        if ( i == 0 ) {
            arrayLidas[i] = "X";
        } else {
            if ( i <= ( stringLidas.length ) ) {
                arrayLidas[i] = stringLidas.charAt( i-1 );
            } else {
                arrayLidas[i] = "N";
            };
        };
    };

    return arrayLidas;
};


/*---------------------------------------*/
function le_transformDataLocal( dtTrans ) {
/*---------------------------------------*/
//console.log("leit.js> *** Executando le_transformDataLocal( dtTrans ) ***");

    var dt = new Date(dtTrans);
    var dtLocal = dt.toLocaleDateString();

    return dtLocal;
};


/*--------------------------------------*/
function le_carregaArrayDatas( dataIni ) {
/*--------------------------------------*/
//console.log("leit.js> *** Executando le_carregaArrayDatas( dataIni ) ***");
    var dt, dtlocal;

    arrayDatas = new Array();            

    dt = new Date( dataIni );
    for (i = 1; i <= 365; i++) {
        dtlocal = dt.toLocaleDateString();
        arrayDatas[i] = dtlocal;
        dt.setDate(dt.getDate() + 1);
    };

    return arrayDatas;
};


/*------------------------------------------*/ 
function le_verLeituraPendente( arrayLidas ) {
/*------------------------------------------*/
//console.log("leit.js> *** Executando le_verLeituraPendente() ***");

    for (i = 1; i <= 365; i++) {
        if ( arrayLidas[i] == "N" ) {
            return i;
        };
    };

    return 365;
};


/*---------------------------------------------------*/
function le_verificaLeituraHoje( arrayDat , datHoje ) {
/*---------------------------------------------------*/
//console.log("leit.js> *** Executando le_verificaLeituraHoje( arrayDat , datHoje ) ***");

    for (i = 1; i <= 365; i++) {
        if ( datHoje == arrayDat[i] ) {
            return i;
        };
    };

    return 365;
};


/*---------------------------------*/
function le_carregaTitViewLeitura() {
/*---------------------------------*/

    $("#id_nomeView").text( "Leitura " + ev_numLeit );

};


/*---------------------------------*/
function le_recuperaNomeEvangelho() {
/*---------------------------------*/
//console.log("leit.js> *** Executando le_recuperaNomeEvangelho() ***");

    nEvang = "Evangelho de João";

    // ACERTAR

    return nEvang;
};


/*---------------------------------*/
function le_recuperaVersicLeitura() {
/*---------------------------------*/
//console.log("leit.js> *** Executando le_recuperaVersicLeitura ***");

    vLeitura = "Jo 2, 13-20";

    // ACERTAR

    return vLeitura;
};
