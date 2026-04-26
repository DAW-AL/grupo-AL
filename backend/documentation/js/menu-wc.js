'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-0b0b7671ab54b7ddb05eaa061ff27aa8dddb267c3d8d93ed337745a844d64fdafbc62c868f86edc4f1f58d3acac98c3c0f44ed8a87b22878d11b53026654b0ff"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-0b0b7671ab54b7ddb05eaa061ff27aa8dddb267c3d8d93ed337745a844d64fdafbc62c868f86edc4f1f58d3acac98c3c0f44ed8a87b22878d11b53026654b0ff"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-0b0b7671ab54b7ddb05eaa061ff27aa8dddb267c3d8d93ed337745a844d64fdafbc62c868f86edc4f1f58d3acac98c3c0f44ed8a87b22878d11b53026654b0ff"' :
                                            'id="xs-controllers-links-module-AuthModule-0b0b7671ab54b7ddb05eaa061ff27aa8dddb267c3d8d93ed337745a844d64fdafbc62c868f86edc4f1f58d3acac98c3c0f44ed8a87b22878d11b53026654b0ff"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GestionModule.html" data-type="entity-link" >GestionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-GestionModule-d07e0325cd9ec628b207c5ac74ba44c98733b4a6137ff036484f6dee78419f55cc24907bbcc4d45a8041bba6bd3c5d385ae46078f3450184de451d214e803fd6"' : 'data-bs-target="#xs-controllers-links-module-GestionModule-d07e0325cd9ec628b207c5ac74ba44c98733b4a6137ff036484f6dee78419f55cc24907bbcc4d45a8041bba6bd3c5d385ae46078f3450184de451d214e803fd6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-GestionModule-d07e0325cd9ec628b207c5ac74ba44c98733b4a6137ff036484f6dee78419f55cc24907bbcc4d45a8041bba6bd3c5d385ae46078f3450184de451d214e803fd6"' :
                                            'id="xs-controllers-links-module-GestionModule-d07e0325cd9ec628b207c5ac74ba44c98733b4a6137ff036484f6dee78419f55cc24907bbcc4d45a8041bba6bd3c5d385ae46078f3450184de451d214e803fd6"' }>
                                            <li class="link">
                                                <a href="controllers/ClientesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClientesController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/ProyectosController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProyectosController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/TareasController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TareasController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-GestionModule-d07e0325cd9ec628b207c5ac74ba44c98733b4a6137ff036484f6dee78419f55cc24907bbcc4d45a8041bba6bd3c5d385ae46078f3450184de451d214e803fd6"' : 'data-bs-target="#xs-injectables-links-module-GestionModule-d07e0325cd9ec628b207c5ac74ba44c98733b4a6137ff036484f6dee78419f55cc24907bbcc4d45a8041bba6bd3c5d385ae46078f3450184de451d214e803fd6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-GestionModule-d07e0325cd9ec628b207c5ac74ba44c98733b4a6137ff036484f6dee78419f55cc24907bbcc4d45a8041bba6bd3c5d385ae46078f3450184de451d214e803fd6"' :
                                        'id="xs-injectables-links-module-GestionModule-d07e0325cd9ec628b207c5ac74ba44c98733b4a6137ff036484f6dee78419f55cc24907bbcc4d45a8041bba6bd3c5d385ae46078f3450184de451d214e803fd6"' }>
                                        <li class="link">
                                            <a href="injectables/TareasService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TareasService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ClientesController.html" data-type="entity-link" >ClientesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProyectosController.html" data-type="entity-link" >ProyectosController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TareasController.html" data-type="entity-link" >TareasController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Cliente.html" data-type="entity-link" >Cliente</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Proyecto.html" data-type="entity-link" >Proyecto</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Tarea.html" data-type="entity-link" >Tarea</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateClienteDto.html" data-type="entity-link" >CreateClienteDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProyectoDto.html" data-type="entity-link" >CreateProyectoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTareaDto.html" data-type="entity-link" >CreateTareaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ListClienteDTO.html" data-type="entity-link" >ListClienteDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ListProyectoDTO.html" data-type="entity-link" >ListProyectoDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ListTareaDTO.html" data-type="entity-link" >ListTareaDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProyectoDTO.html" data-type="entity-link" >ProyectoDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateClienteDto.html" data-type="entity-link" >UpdateClienteDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProyectoDto.html" data-type="entity-link" >UpdateProyectoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTareaDto.html" data-type="entity-link" >UpdateTareaDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/TareasService.html" data-type="entity-link" >TareasService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});