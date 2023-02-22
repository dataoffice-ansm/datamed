/* eslint-disable no-warning-comments */
import Link from 'next/link';
import { type FaqType } from './FaqContentLegacy';

export const faqData: FaqType[] = [
  {
    index: 0,
    title: "DATA.ANSM c'est quoi ?",
    id: 'what-is-data-ansm',
    parts: [
      {
        title: 'Ce que data.ansm est...',
        id: 'ce-qu-est-data-ansm',
        style: 'bubble',
        bubbleColor: 'green',
        entries: [
          {
            title:
              "Une plateforme de partage des données agglomérées et vérifées, parfois exclusives de bases de l'ANSM et de bases extérieures à l'ANSM (ex : CNAM)",
          },
          {
            title:
              "Un site en accès libre, qui s'adresse à tous : patients, professionnels de santé, experts en données",
          },
          {
            title:
              'Un site de partage des données sur le médicament (médicaments remboursées en France en officine de ville, déclaration des effets indésirables, historique des déclarations de ruptures ou de risque de ruptures de stock de médicaments)',
          },
          {
            title: "L'accès à des données émises et validées par une autorité sanitaire (ANSM)",
          },
          {
            title:
              'Un site et sous-domaine de <a rel="external" target="_blank" href="https://ansm.sante.fr/">ansm.sante.fr</a> , développé et géré par le service numérique et d\'exploitation des données de l\'ANSM (Data Office)',
          },
        ],
      },
      {
        title: "Ce que n'est pas data.ansm",
        id: 'ce-que-n-est-pas-data-ansm',
        style: 'bubble',
        bubbleColor: 'red',
        entries: [
          {
            title:
              "Un site de recommandations sur l'utilisation des médicaments (posologie, indications, etc.)",
            content: (
              <div>
                <p>Chaque fiche de spécialité de médicament comporte :</p>
                <ul className="list-outside">
                  <li>
                    <p>
                      Un lien vers la Base de données publique des médicaments mise en oeuvre par
                      l&apos;ANSM, en liaison avec la HAS et la CNAM : qui présente une fiche, la
                      notice à destination des patients et le résumé des caractéristiques du produit
                      (RCP) pour chaque médicament
                    </p>
                  </li>
                  <li>
                    <p>Un lien vers les recommandations HAS</p>
                  </li>
                </ul>
              </div>
            ),
          },
          {
            title: "Un répertoire complet de l'ensemble des médicaments",
            content: (
              <p>
                Data.ansm est une plateforme de partage de données issues des bases de l&apos;ANSM
                et d&apos;autres bases dont elle utilise les données dans le cadre de ses missions.
                Elle assure la mise en ligne et la visualisation des données. Elle ne se substitue
                pas à l&apos;ensemble des autres sites officiels concernant le médicament, elle en
                est complémentaire.
              </p>
            ),
          },
          {
            title: 'Un outil de calcul et de croisement de données individuelles des patients',
            content: (
              <p>
                Data.ansm est une plateforme de données agglomérées, elle n&apos;a pas pour objectif
                d&apos;afficher les détails des données individuelles.
              </p>
            ),
          },
          {
            title: 'Un site de consultation médicale',
            content: (
              <p>
                La consultation médicale est individuelle et privée qui aboutit à un diagnostic lors
                de l&apos;examen clinique. C&apos;est un moment privilégié entre le médecin et son
                patient qui ne peut être en aucun cas remplacé par une information sur un site. En
                cas de question sur votre santé, adressez-vous à un professionel de santé (médecins,
                pharmaciens, sages-femmes, infirmiers, autres intervenants du paramédical).
              </p>
            ),
          },
          {
            title: "Le site officiel de l'ANSM",
            content: (
              <p>
                Le site de l&apos;ANSM comporte des informations qui couvrent un large périmètre
                dont les effets indésirables des médicaments ou les ruptures de stock. Data.ansm est
                un service dépendent de l&apos;ANSM et permet de les illustrer avec des données des
                bases élaborées par l&apos;ANSM et ses partenaires
              </p>
            ),
          },
          {
            title: 'Un site de partage de données exhaustives sur les effets indésirables',
            content: (
              <p>
                La Base Nationale de Pharmacovigilance (BNPV) est alimentée par les déclarations
                spontanées d&apos;évènements indésirables des médicaments par les professionels de
                santé, les patients et leur entourage. Elle est de ce fait non exhaustive. La
                pharmacovigilance a pour objectif d&apos;identifier les effets inattendus, notamment
                graves, des médicaments. Elle n&apos;a pas pour objectif de quantifier la fréquence
                de survenue des effets indésirables, et donc un recensement exhaustif de
                l&apos;ensemble des cas d&apos;effets indésirables. data.ansm a pour objectif de
                partager les données issues des déclarations d&apos;effets indésirables contenues
                dans la BNPV.
              </p>
            ),
          },
          {
            title: 'Un site de déclaration des effets indésirables',
            content: (
              <p>
                <a
                  rel="external noreferrer"
                  target="_blank"
                  href="https://solidarites-sante.gouv.fr/soins-et-maladies/signalement-sante-gouv-fr/"
                >
                  Le portail ministériel
                </a>{' '}
                a été conçu spécifiquement pour recueillir les effets indésirables observés par les
                patients et professionnels de santé. <br />
                Ces signalements sont ensuite traités par les centres régionaux de pharmacovigilance
                (CRPV) avant enregistrement dans la base nationale de pharmacovigilance. data.ansm
                n&apos;est pas destiné à recueiilir des signalements.
              </p>
            ),
          },
        ],
      },
    ],
  },
  {
    index: 1,
    title: 'Données globales de la plateforme',
    id: 'donnees-globales-de-la-plateforme',
    parts: [
      {
        title: 'Types et sources des données',
        id: 'types-et-sources-des-donnees',
        style: 'accordion',
        entries: [
          {
            title: 'Sur quels critères ont été choisies les données affichées ?',
            content: (
              <div>
                <p>Les données de data.ansm ont été sélectionnées selon plusieurs critères:</p>
                <ul>
                  <li>Leur qualité et leur exploitabilité</li>
                  <li>Leur disponibilité immédiate</li>
                  <li>Le caractère innovant et exclusif de leur affichage</li>
                  <li>
                    Leur pertinence par rapport aux demandes des patients, professionnels de santé
                    et autres acteurs intéressés par les données de santé
                  </li>
                  <li>Leur capacité à être diffusées en open source (anonymisation...)</li>
                </ul>
              </div>
            ),
          },
          {
            title:
              "Quelles sont les données disponibles actuellement ? Quelle est leur nature ? Et d'où viennent-elles ?",
            content: (
              <div>
                <p>Data.ansm utilise actuellement des extraits de 4 bases de données :</p>
                <ul className="list-outside">
                  <li>
                    <p className="title">
                      La Base de données publique des médicaments (ANSM, HAS et Cnam)
                    </p>
                    <p>
                      <a
                        rel="external noreferrer"
                        target="_blank"
                        href="https://base-donnees-publique.medicaments.gouv.fr/"
                      >
                        La Base de données publique des médicaments
                      </a>{' '}
                      permet au grand public et aux professionnels de santé d&apos;accéder à des
                      données et documents de référence sur les médicaments commercialisés ou ayant
                      été commercialisés durant les trois dernières années en France.
                    </p>
                    <p>
                      Cette base de données administratives et scientifiques sur les traitements et
                      le bon usage des produits de santé est mise en œuvre par l&apos;Agence
                      nationale de sécurité du médicament et des produits de santé (ANSM), en
                      liaison avec la Haute Autorité de santé (HAS) et l&apos;Union nationale des
                      caisses d&apos;assurance maladie (Uncam), sous l&apos;égide du Ministère des
                      solidarités et de la santé
                    </p>
                  </li>
                  <li>
                    <p className="title">
                      ORDEI : Outil d&apos;information des effets indésirables (ANSM, Cnam)
                    </p>
                    <p>
                      L&apos;outil permet de réaliser des recherches de données d&apos;effets
                      indésirables par substance active et de dispensation par spécialité de
                      médicament et substance active entre 2014 et 2018 pour le moment. Les données
                      proviennent de 3 bases:{' '}
                      <strong>la Base nationale de pharmacovigilance</strong> de l’Agence nationale
                      de sécurité du médicament et des produits de santé (base BNPV), la base de
                      l’ANSM contenant les informations sur les autorisations de mise sur le marché
                      des médicaments (base <strong>CODEX</strong>) et la base contenant les
                      informations de remboursement des médicaments : dans un premier temps,
                      <strong>Open Medic</strong>, une base de donnée d&apos;accès libre gérée par
                      la Cnam (Caisse nationale de l&apos;Assurance Maladie), puis elle sera
                      remplacée par des estimations tirées du{' '}
                      <strong>SNDS (Système national des données de santé)</strong>.
                    </p>

                    <p>
                      L&apos;outil a été développé par les équipes du Health Data Hub et
                      l&apos;équipe Entrepreneurs d&apos;intérêt général à travers le projet
                      DataMed, tandis que les agents de l&apos;ANSM offrent leur expertise pour
                      l&apos;analyse et la visualisation des données.
                      <br />
                      <a
                        rel="external noreferrer"
                        target="_blank"
                        href="https://documentation-snds.health-data-hub.fr/evenements/meetup.html#_2021-06-24-meetup-snds10"
                      >
                        Voir l&apos;explication du projet lors du MeetUp SNDS organisé par le HDH
                      </a>
                    </p>
                  </li>
                  <li>
                    <p className="title">Base des erreurs médicamenteuses (ANSM)</p>
                    <p>
                      La base des erreurs médicamenteuses portée par l&apos;ANSM, regroupe depuis
                      2011 toutes les erreurs et risques d&apos;erreurs recensés aux différents
                      stades de vie du médicament : prescription, délivrance, administration. Leur
                      signalement permet de détecter les erreurs pour lesquelles le médicament peut
                      être responsable, mettre en place des mesures correctives, informer les
                      professionnels de santé et les patients afin d&apos;éviter de reproduire ces
                      erreurs, en particulier celles avec des conséquences graves.
                    </p>
                    <p>
                      Depuis 2019, les erreurs médicamenteuses sont déclarées sur{' '}
                      <a
                        rel="external noreferrer"
                        target="_blank"
                        href="https://solidarites-sante.gouv.fr/soins-et-maladies/signalement-sante-gouv-fr/"
                      >
                        signalement-sante.gouv.fr
                      </a>
                      et les 31 Centres régionaux de pharmacovigilance (CRPV) de France. Le cas cas
                      échéant, les données sont saisies par les CRPV dans la BNPV.
                    </p>
                    <p>
                      Les erreurs médicamenteuses jugées les plus graves et à risque sont alors
                      analysées par les équipes de surveillance de l&apos;ANSM et classifiées dans
                      la base des erreurs médicamenteuses. Ouvertes dans un premier temps pour le{' '}
                      <a
                        rel="external noreferrer"
                        target="_blank"
                        href="https://ansm.sante.fr/actualites/succes-du-premier-hackathon-e-med-consacre-aux-erreurs-medicamenteuses-communique"
                      >
                        hackathon organisé par l&apos;ANSM en 2019
                      </a>
                      , le projet a été intégré au{' '}
                      <a
                        rel="external noreferrer"
                        target="_blank"
                        href="https://eig.etalab.gouv.fr/defis/datamed/"
                      >
                        programme des Entrepreneurs d&apos;Intérêt Général
                      </a>{' '}
                      à travers le défi DataMed.
                    </p>
                  </li>
                  <li>
                    <p className="title">
                      Ruptures et risque de rupture de stock de médicaments (ANSM)
                    </p>
                    <p>
                      Les données de déclarations obligatoires concernent uniquement les médicaments
                      d&apos;intérêt thérapeutique majeur MITM (i). Les données de ruptures et de
                      risques de rupture de stock présentes sur data.ansm sont issues de deux bases:
                    </p>
                    <ul className="list-outside">
                      <li>
                        De 2014 à avril 2021: une base d&apos;enregistrement des déclarations ne
                        contenant que les informations initiales fournies par les laboratoires
                        pharmaceutiques
                      </li>
                      <li>
                        À partir de mai 2021 : une plateforme de télédéclaration (Trustmed) qui
                        permet non seulement l&apos;enregistrement initial des déclarations mais
                        aussi le suivi complet des dossiers y compris les mesures que l&apos;ANSM
                        met en place pour pallier et anticiper les ruptures.
                      </li>
                    </ul>
                    <p>
                      L&apos;ANSM publie régulièrement sur son site ansm.sante.fr des informations
                      sur les situations de ruptures et risques de ruptures pour lesquelles des
                      mesures palliatives ont été mises en place.{' '}
                      <a
                        rel="external noreferrer"
                        target="_blank"
                        href="https://ansm.sante.fr/disponibilites-des-produits-de-sante/medicaments"
                      >
                        Retrouvez la liste de la disponibilité des médicaments
                      </a>
                    </p>
                  </li>
                </ul>
              </div>
            ),
          },
        ],
      },
      {
        title: 'Mise à jour des données',
        id: 'mise-a-jour-des-donnees',
        disabled: true,
        style: 'accordion',
        entries: [
          {
            title: 'Quelle est la fréquence de mise à jour des données ?',
            content: <p>Les données sont mises à jour toutes les TODO semaines</p>,
            disabled: true,
          },
          {
            title: 'Qui met à jour les données ?',
            content: (
              <p>
                Les équipes de l&apos;inspection et de la surveillance à l&apos;ANSM veillent à la
                maintenance de leurs bases de données. L&apos;équipe du Data Office de l&apos;ANSM
                se charge de coordonner le tout et s&apos;assure de la bonne intégration des
                dernières données. L&apos;équipe du Health Data Hub contribue à l&apos;alimentation
                en données de santé provenant d&apos;autres institutions de santé.
              </p>
            ),
          },
          {
            title: 'Sur quelle période les données sont traitées ?',
            disabled: true,
            content: (
              <div>
                <p className="mb-2">
                  Chaque base de données étant gérée par des équipes différentes et certaines par
                  d&apos;autres institution, la disponibilité et leur mise à jour diffèrent
                  d&apos;une base à l&apos;autre.
                </p>

                <p className="title">Données d&apos;usage et de consommation du médicament</p>
                <p>
                  Les données sont comprises entre 2014 et 2018. Les données étant exploitées pour
                  la première fois dans ce cadre, leur extraction, mise en forme est longue
                </p>
                <p className="title">Données des erreurs médicamenteuses</p>
                <p>TODO</p>
                <p className="title">Données des ruptures de stock</p>
                <p>
                  Les données globales reprennent l&apos;historique à partir de 2014. Et les données
                  sur l&apos;historique des ruptures de stock sont publiées à partir de mai 2021 ???
                  (TODO)
                </p>
              </div>
            ),
          },
          {
            title: 'À quand les données en temps réel ?',
            content: <p>TODO</p>,
            disabled: true,
          },
        ],
      },
      {
        title: 'Données COVID 19',
        id: 'donnes-covid-19',
        style: 'accordion',
        entries: [
          {
            title: "Y'a-t-il des données autour des vaccins contre la COVID-19 sur data.ansm ?",
            content: (
              <p>
                Pour le moment, il n&apos;y a pas de données autour des vaccins contre la COVID-19
                sur le site data.ansm. Retrouvez les points de situation, fiches de synthèse et
                rapports d&apos;enquêtes actualisés sur les vaccins en cours d&apos;usage sur le
                site{' '}
                <a
                  rel="external noreferrer"
                  target="_blank"
                  href="https://ansm.sante.fr/dossiers-thematiques/covid-19-medicaments-et-dispositifs-medicaux"
                >
                  ansm.sante.fr
                </a>
              </p>
            ),
          },
          {
            title: 'Où trouver les informations autour des traitements contre la COVID-19 ?',
            content: (
              <div>
                <p>
                  L&apos;ANSM est l&apos;autorité compétente nationale pour le suivi et le contrôle
                  de l&apos;ensemble des vaccins et produits de santé utilisés dans la lutte contre
                  la COVID-19, en lien avec l&apos;agence européenne du médicament et les centres
                  régionaux de pharmacovigilance.
                </p>
                <p>
                  <a
                    rel="external noreferrer"
                    target="_blank"
                    href="https://ansm.sante.fr/dossiers-thematiques/covid-19-suivi-hebdomadaire-des-cas-deffets-indesirables-des-vaccins"
                  >
                    Retrouvez la section spéciale suivi des effets indésirables COVID-19 sur le site
                    de l&apos;ANSM
                  </a>
                  <br />
                  <a
                    rel="external noreferrer"
                    target="_blank"
                    href="https://ansm.sante.fr/dossiers-thematiques/covid-19-medicaments-et-dispositifs-medicaux"
                  >
                    Retrouvez l&apos;ensemble des traitements surveillés par l&apos;ANSM
                  </a>
                </p>
              </div>
            ),
          },
          {
            title: 'Où trouver les données fiables et de référence autour de la Covid-19 ?',
            content: (
              <div>
                <p>
                  Retrouvez les informations liées à la Covid-19 dans{' '}
                  <a
                    rel="external noreferrer"
                    target="_blank"
                    href="https://ansm.sante.fr/dossiers-thematiques/covid-19"
                  >
                    les dossiers thématiques du site de l&apos;ANSM
                  </a>
                </p>
                <p> Pour aller plus loin :</p>
                <ul className="list-outside">
                  <li>
                    <a
                      rel="external noreferrer"
                      target="_blank"
                      href="https://www.covireivac.fr/les-essais-en-cours/les-roles-dans-la-realisation-dun-essai/les-essais-lances/cest-quoi-un-essai-clinique/?cn-reloaded=1"
                    >
                      Qu&apos;est-ce qu&apos;un essai clinique dans le cas d&apos;un vaccin ?
                    </a>{' '}
                    — Covireivac
                  </li>
                  <li>
                    <a
                      rel="external noreferrer"
                      target="_blank"
                      href="https://solidarites-sante.gouv.fr/prevention-en-sante/preserver-sa-sante/vaccination/vaccins-obligatoires/article/comment-est-assuree-la-securite-des-vaccins"
                    >
                      Comment est assurée la sécurité d&apos;un vaccin ?
                    </a>{' '}
                    — Ministère des Solidarités et de la Santé
                  </li>
                  <li>
                    <a
                      rel="external noreferrer"
                      target="_blank"
                      href="https://solidarites-sante.gouv.fr/grands-dossiers/vaccin-covid-19/je-suis-un-particulier"
                    >
                      Consulter les réponses à vos questions sur la vaccination contre la Covid-19
                    </a>{' '}
                    — Ministère des Solidarités et de la Santé
                  </li>
                  <li>
                    <a
                      rel="external noreferrer"
                      target="_blank"
                      href="https://vaccination-info-service.fr/"
                    >
                      Vaccination info services
                    </a>
                  </li>
                  <li>
                    <a
                      rel="external noreferrer"
                      target="_blank"
                      href="https://vaccination-info.eu/fr"
                    >
                      Portail européen d&apos;information sur la vaccination
                    </a>
                  </li>
                </ul>
              </div>
            ),
          },
          {
            title:
              "Où trouver les points d'informations et recommandations de l'ANSM sur les médicaments avec Autorisation de Mise sur le Marché (AMM) ?",
            content: (
              <div>
                <p>
                  L&apos;ANSM publie régulièrement des avis et des rapports concernant l&apos;usage
                  des médicaments avec Autorisation de Mise sur le Marché (AMM) en France. Ils sont
                  répertoriés en bas de page dans la section &quot;Publications&quot; lors
                  d&apos;une recherche de médicament sur ce site.
                </p>
                <p>
                  {' '}
                  Si vous n&apos;en trouvez aucun, c&apos;est qu&apos;aucune publication n&apos;a
                  été faite sur le sujet, au delà du RCP (Résumé des caractéristiques du produit) et
                  de la notice patient. Si vous constatez une anomalie, vous pouvez nous faire
                  remonter cette information.
                </p>
              </div>
            ),
          },
        ],
      },
      {
        title: "Données de l'ANSM et de son site principal",
        id: 'donnes-ansm-site-principal',
        style: 'accordion',
        entries: [
          {
            title:
              "Où trouver les avis et rapports d'évaluation de l'ANSM sur les médicaments en Essai clinique, en accès précoce et dérogatoire, réévaluation de médicaments avec Autorisation de Mise sur le Marché (AMM) ?",
            content: (
              <div>
                <p>
                  Les rapports d&apos;évaluation d&apos;essais cliniques ne sont à ce jour pas
                  disponibles au grand public pour des raisons de confidentialité.
                </p>
                <p>
                  Les rapports (overview) d&apos;AMM à l&apos;échelle européenne sont disponibles
                  sur le{' '}
                  <a
                    rel="external noreferrer"
                    target="_blank"
                    href="https://www.ema.europa.eu/en/medicines/medicines-human-use-under-evaluation"
                  >
                    site de l&apos;EMA (Agence Européenne du Médicament)
                  </a>
                  .
                </p>
                <p>
                  Les rapports d&apos;AMM national (France) ne sont pas à ce jour accessibles au
                  grand public. Les comptes rendus des comités scientifiques permanents sont
                  disponibles sur le site de l&apos;agence (ansm.sante.fr).
                </p>
              </div>
            ),
          },
          {
            title: "Quelle est la différence entre le site de l'ANSM et data.ansm ?",
            content: (
              <div>
                <p>
                  L&apos;ANSM possède un site (ansm.sante.fr) qui répertorie toutes les données
                  éditoriales, les informations importantes relatives aux médicaments et aux
                  produits de santé.{' '}
                </p>
                <p>
                  data.ansm.sante.fr est un sous-domaine du site de l&apos;Agence : il vient en
                  complément du site principal (ansm.sante.fr) pour apporter un autre aspect des
                  données relatives au médicament avec explications et statistiques par médicaments
                  après commercialisaition dans un premier temps.
                </p>
                <p>
                  À terme, data.ansm.sante.fr a pour mission de partager en open data
                  l&apos;ensemble des données exploitables par le grand public et respectant les
                  données personnelles.
                </p>
              </div>
            ),
          },
        ],
      },
      {
        title: 'Newsletter',
        id: 'newsletter',
        style: 'accordion',
        entries: [
          {
            title: "Y'a-t-il une newsletter ?",
            content: (
              <p>
                data.ansm ne possède pas de newsletter. Cependant, le site de l&apos;ANSM possède
                deux types d&apos;informations en continu : une newsletter hebdomadaire et la veille
                personnalisée, entièrement paramétrable <br />{' '}
                <a
                  rel="external noreferrer"
                  target="_blank"
                  href="https://ansm.sante.fr/newsletter"
                >
                  Inscrivez-vous via le site de l&apos;ANSM
                </a>
              </p>
            ),
          },
        ],
      },
      {
        title: "Données d'autres institutions",
        id: 'donnes-d-autres-institutions',
        style: 'accordion',
        entries: [
          {
            title: "Avec quelles instances travaille l'ANSM ?",
            content: (
              <p>
                Dans le cadre de sa politique d&apos;ouverture à la société civile, l&apos;ANSM
                travaille avec de nombreux acteurs dans le domaine de la santé (institutions,
                patients, professionnels de santé...). Elle organise également des comités
                scientifiques (expertise) et des comité d&apos;interface avec des patients,
                médecins, pharmaciens. <br />{' '}
                <a
                  rel="external noreferrer"
                  target="_blank"
                  href="https://ansm.sante.fr/qui-sommes-nous/notre-organisation/nos-instances/p"
                >
                  Retrouvez les informations liées aux instances
                </a>
              </p>
            ),
          },
          {
            title: 'Quelles données de la Cnam sont utilisées sur data.ansm ?',
            content: (
              <p>
                La Caisse nationale de l&apos;Assurance Maladie alimente la base de données du SNDS
                (Système national des données de santé). Il existe un libre accès à certaines de ses
                données présentes dans la base Open Medic. Data.ansm utilise des données des
                remboursements de médicaments dispensés en pharmacie.
              </p>
            ),
          },
          {
            title: 'Quelles données de la HAS sont utilisées sur data.ansm ?',
            content: (
              <p>
                La comission de la transparence de la Haute Autorité de santé émet des
                recommandations de prise en charge de certaines pathologies et de l&apos;utilisation
                de certains médicaments. Data.ansm référence ces avis dans l&apos;encart de
                description des médicaments.
              </p>
            ),
          },
          {
            title: "Qu'est-ce que le Health Data Hub ?",
            content: (
              <p>
                Le Health Data Hub (HDH) est un groupement d’intérêt public qui garantit l’accès
                aisé et unifié, transparent et sécurisé, aux données de santé pour améliorer la
                qualité des soins et l’accompagnement des patients. L’Agence nationale de sécurité
                des médicaments et des produits de santé (ANSM) et le Health Data Hub (HDH) signent
                une convention-cadre pour favoriser le partage des données dont dispose l’ANSM et
                l’open source tout en garantissant la protection des données personnelles.
                L’objectif est double : faciliter pour tous l’accès aux données sur les médicaments
                et assurer une plus grande transparence <br />{' '}
                <a
                  rel="external noreferrer"
                  target="_blank"
                  href="https://ansm.sante.fr/actualites/lansm-et-le-health-data-hub-partenaires-pour-faciliter-lacces-aux-donnees-sur-les-produits-de-sante"
                >
                  Lire l&apos;article complet
                </a>
              </p>
            ),
          },
        ],
      },
      {
        title: 'Confidentialité des données',
        id: 'confidentialite-des-donnees',
        style: 'accordion',
        entries: [
          {
            title: 'Comment les données personnelles médicales sont-elles respectées ?',
            content: (
              <p>
                Le site data.ansm ne contient aucune donnée à caractère personnel. Les données
                publiées sont issues des bases de données de l&apos;ANSM et d&apos;autres
                institutions françaises (Cnam) et ont fait l&apos;objet d&apos;une anonymisation
                afin de garantir la protection de la vie privée des patients. Pour cela, seules des
                données agrégées sont mises en ligne. Lorsqu&apos;un indicateur relatif aux effets
                indésirables concerne moins de 11 patients, le nombre de personnes concernées
                n&apos;est pas affiché, afin d&apos;éviter toute réidentification possible des
                patients. <br /> data.ansm n&apos;a pas vocation à permettre aux usagers
                l&apos;accès à leurs données médicales personnelles (pas d&apos;accès au dossier
                médical partagé).
              </p>
            ),
          },
          {
            title: 'Y-a-t-il une protection des données à caractère personnel ?',
            content: (
              <p>
                Le site data.ansm ne contient aucune donnée à caractère personnel. Les données
                publiées sont issues des bases de données de l&apos;ANSM et ont fait l&apos;objet
                d&apos;une anonymisation afin de garantir la protection de la vie privée des
                patients. Pour cela, seules des données agrégées sont mises en ligne. Lorsqu&apos;un
                effet indésirable concerne moins de 10 patients, le nombre de personnes concernées
                n&apos;est pas affiché, afin d&apos;éviter toute réidentification possible des
                patients.
              </p>
            ),
          },
          {
            title: "Quelle est la procédure d'anonymisation ?",
            // TODO vérifier avec Evelyne Pierron
            disabled: true,
            content: (
              <p>
                Les données de notification d&apos;effets indésirables sont anonymisés avant saisie
                dans la Base Nationale de Pharmacovigilance, par les Centres Régionaux de
                Pharmacovigilance.
              </p>
            ),
          },
        ],
      },
      {
        title: 'Exploration, réutilisation des données',
        id: 'exploration-reutilisation-des-donnees',
        style: 'accordion',
        entries: [
          {
            title: "Qu'est-ce que l'open source et l'open data?",
            content: (
              <div>
                <p>
                  Les données ouvertes, ou open data sont des données numériques produites par les
                  acteurs publics (ministère, collectivité ou établissement public, etc.), mais
                  aussi par des acteurs privés (entreprise, association, citoyen, etc.).
                </p>
                <p>
                  Ces données sont diffusées de manière structurée selon une licence ouverte
                  garantissant leur libre accès et leur réutilisation par tous, sans restriction
                  technique, juridique ou financière.{' '}
                </p>
                <p>
                  Les données ouvertes portent sur des sujets très divers. Il peut s’agir, par
                  exemple, de données géographiques, financières, de transport, de santé publique ou
                  encore d’environnement.
                  <br />
                  <a
                    rel="external noreferrer"
                    target="_blank"
                    href="https://www.data.gouv.fr/fr/pages/about/a-propos/"
                  >
                    définition complète sur data.gouv.fr
                  </a>
                </p>
              </div>
            ),
          },
          {
            title:
              'Les données de data.ansm sont-elles ouvertes, pour un accès libre aux usagers ?',
            content: (
              <p>
                Les données actuellement présentes sur le site sont à l&apos;étude pour être mises
                en open data. Lorsque celles-ci seront disponibles et téléchargeables, elles seront
                publiées dans le répertoire des données open source du gouvernement sur{' '}
                <a
                  rel="external noreferrer"
                  target="_blank"
                  href="https://www.data.gouv.fr/fr/datasets/lagence-nationale-de-securite-des-medicaments-et-des-produits-de-sante-ansm/"
                >
                  data.gouv.fr
                </a>
              </p>
            ),
          },
          {
            title: 'Le code de développement du site est-il open source ?',
            content: (
              <p>
                Le code du site est publié entièrement en open source, le dépôt est accessible sur{' '}
                <a
                  rel="external noreferrer"
                  target="_blank"
                  href="https://github.com/entrepreneur-interet-general/datamed"
                >
                  Github
                </a>
                . La publication du code source ouvert répond aux objectifs de partage du programme{' '}
                <a
                  rel="external noreferrer"
                  target="_blank"
                  href="https://entrepreneur-interet-general.etalab.gouv.fr/index.html"
                >
                  Entrepreneur d&apos;Intérêt Général
                </a>
                , porté par{' '}
                <a rel="external noreferrer" target="_blank" href="https://www.etalab.gouv.fr/">
                  Etalab
                </a>
                , qui est un département de la direction interministérielle du numérique (DINUM),
                dont les missions et l’organisation sont fixées par le décret du 30 Octobre 2019.
                Faisant office de « Chief Data Officer » de l’Etat (au titre des missions de
                l’Administrateur général des données, des algorithmes et des codes sources), il
                coordonne la conception et la mise en œuvre de la stratégie de l’État dans le
                domaine de la donnée.
              </p>
            ),
          },
          {
            title: 'Est-t-il possible de télécharger les données ?',
            content: (
              <p>
                Les données actuellement présentes sur le site sont à l&apos;étude pour être mises
                en open data; Lorsque celles ci seront disponibles et téléchargeables, elles seront
                publiées dans le répertoire des données open source du gouvernement sur{' '}
                <a
                  rel="external noreferrer"
                  target="_blank"
                  href="https://www.data.gouv.fr/fr/datasets/lagence-nationale-de-securite-des-medicaments-et-des-produits-de-sante-ansm/"
                >
                  data.gouv.fr
                </a>
                <br />
                En fonction du volume de données à télécharger dans le futur, la fonctionnalité de
                télécharger depuis data.ansm sera envisagée.
              </p>
            ),
          },
          {
            title: "Existe-il des API pour intégrer les données de l'ANSM à un outil/site/appli ?",
            content: (
              <p>
                Il n&apos;existe pas d&apos;API (Application Program Interface) à ce jour pour
                connecter les jeux de données de data.ansm pour des usages externes.
              </p>
            ),
          },
          {
            title: "Quelle est la démarche à suivre pour réutiliser les données de l'ANSM ?",
            // TODO lien mentions legales
            content: (
              <div>
                <p>
                  Les données et les informations présentes sur le site Internet
                  www.data.ansm.sante.fr sont mises à disposition du public par l&apos;Agence
                  nationale de sécurité du médicament et des produits de santé. Ces informations
                  sont protégées par la Convention de Berne sur la Protection des œuvres littéraires
                  et artistiques, par d&apos;autres conventions internationales et par les
                  législations nationales sur le droit d&apos;auteur et les droits dérivés.
                  L&apos;information et les données contenues sur le site Internet peuvent faire
                  l&apos;objet de revues, ou être reproduites ou traduites à des fins de recherche
                  ou d&apos;étude personnelle, mais ne peuvent être ni vendues ni utilisées à des
                  fins commerciales.
                </p>
                <p>
                  Toute utilisation des données ou des informations provenant du site Internet de
                  l’ANSM doit obligatoirement mentionner l&apos;ANSM en tant que source de
                  l&apos;information.
                </p>
                <p>
                  La reproduction, la traduction, ou toute utilisation de données ou d’informations
                  provenant du site Internet de l’ANSM à des fins autres que personnelles,
                  éducatives ou non commerciales, est subordonnée à l&apos;obtention préalable
                  d&apos;une autorisation écrite formelle du directeur général de l’ANSM ou doit
                  comprendre, de manière aisément lisible, la source de ces données, assortie de la
                  mention suivante : « Avertissement : Le contenu de [cette publication] [cette
                  communication] n’engage que son auteur et n’est pas validé par l’ANSM. » <br />{' '}
                  <Link href="/mentions_legales">
                    <a>Voir les mentions légales</a>
                  </Link>
                </p>
              </div>
            ),
            //TODO
          },
        ],
      },
      {
        title: 'Cibles des données',
        id: 'cibles-des-donnees',
        style: 'accordion',
        entries: [
          {
            title: "À qui s'adressent ces données ?",
            content: (
              <div>
                <p>
                  À tous et en libre accès : ces données s&apos;adressent tout d&apos;abord au grand
                  public (citoyens, patients, aidants, associations de patients), aux professionnels
                  de santé (médecins, pharmaciens, sages-femmes, infirmiers, autres intervenants du
                  paramédical), ensuite aux experts en données (journalistes, data analysts,
                  chercheurs, éditeurs de logiciel).
                </p>
                <p>
                  De nombreuses données sont été présentées avec pédagogie, afin de permettre au
                  plus grand nombre de se les approprier. Toutefois, les équipes ont choisi de
                  maintenir un certain niveau de vocabulaire technique lorsque la démocratisation
                  des termes n&apos;était pas appropriée, et que certaines données nécessitaient
                  d&apos;être montrées avec les termes scientifiques et techniques afin de rester au
                  plus proche de la lecture de données brutes.
                </p>
              </div>
            ),
          },
        ],
      },
      {
        title: 'Définitions',
        id: 'definitions',
        style: 'accordion',
        entries: [
          {
            title: "Existe-il un glossaire de l'ANSM ?",
            content: (
              <p>
                Les données présentées sur data.ansm sont accompagnées au maximum de définitions,
                afin de pouvoir comprendre au mieux les données. Si toutefois des définitions sont
                manquantes ou à corriger/compléter, n&apos;hésitez pas à nous le faire savoir à
                travers{' '}
                <a rel="external noreferrer" target="_blank" href="https://ansm.sante.fr/contact">
                  un formulaire de contact{' '}
                </a>{' '}
                ou à vous rendre sur{' '}
                <a rel="external noreferrer" target="_blank" href="https://ansm.sante.fr/glossaire">
                  la page du Glossaire de l&apos;ANSM{' '}
                </a>{' '}
                ou celle de la{' '}
                <a
                  rel="external noreferrer"
                  target="_blank"
                  href="https://base-donnees-publique.medicaments.gouv.fr/glossaire.php#asmr"
                >
                  Base de Données Publique du Médicament
                </a>{' '}
                où vous pourrez trouver des définitions plus détaillées.
              </p>
            ),
          },
          {
            title:
              'Il y a plusieurs termes que je ne comprends pas sur data.ansm, où trouver leur définition ?',
            content: <p>Voir question ci-dessus</p>,
          },
        ],
      },
    ],
  },
  {
    index: 2,
    title: 'Lecture des données',
    id: 'lecture-des-donnees',
    parts: [
      {
        title: 'Lecture des courbes et des chiffres',
        id: 'lecture-des-courbes-et-des-chiffres',
        style: 'accordion',
        entries: [
          {
            title:
              "Beaucoup des données sont basées sur de la déclaration, qu'est-ce que cela implique ? Les données sur les effets indésirables représentent-elles l'exhaustivité des cas ?",
            content: (
              <p>
                Les données affichées dans les pages de médicaments et les pages de substances
                actives sur les effets indésirables sont basées sur les déclarations spontanées par
                les patients et les professionnels de santé. La sous-déclaration des effets
                indésirables des médicaments est connue. Elle est importante, cependant les
                déclarations permettent de détecter des signaux en pharmacovigilance, même si non
                exhaustives.
              </p>
            ),
          },
          {
            title:
              "Certains chiffres semblent importants (effets indésirables graves, taux de déclaration,...), y'a-t-il de quoi s'inquiéter ?",
            content: (
              <p>
                Le travail d&apos;analyse en pharmacovigilance est de détecter un signal - effet
                indésirable remarquable par sa gravité et/ou par sa fréquence. Tout signal peut
                remettre en cause la positivité de la balance bénéfice/risque du médicament. <br />{' '}
                Il n&apos;y a pas de quoi s&apos;inquiéter, car le cas échéant, l’ANSM met en place
                les mesures nécessaires destinées à prévenir ou réduire les risques afin d’assurer
                la sécurité d’emploi des médicaments, en concertation avec les parties prenantes
                (institutions de santé, associations de patients, comités scientifiques,
                industriels)
              </p>
            ),
          },
          {
            title:
              'Certains chiffres semblent incohérents, comment être sûrs de la fiabilité de la donnée ?',
            content: (
              <p>
                Les équipes font leur maximum pour garantir une haute qualité de données affichées.
                Si toutefois, certaines données vous semblent incohérentes, merci de nous le
                signaler via{' '}
                <a rel="external noreferrer" target="_blank" href="https://ansm.sante.fr/contact">
                  le formulaire de contact
                </a>
                .
              </p>
            ),
          },
          {
            title: "À quoi correspond le taux de déclaration ? Comment l'interpréter ?",
            content: (
              <p>
                Le taux de déclaration est le rapport entre le nombre de déclarations et le nombre
                de boites de médicaments dispensées en officine de ville et remboursées par
                l&apos;Assurance maladie. Cela correspond à l&apos;exposition patient. Le ratio de
                100 000 permet d&apos;avoir la comparaison entre les taux de plusieurs médicaments
                n&apos;ayant pas la même exposition patient. <br /> L&apos;interprétation du taux de
                déclaration ne peut se faire qu&apos;à travers l&apos;analyse du rapport
                bénéfice/risque.
              </p>
            ),
          },
          {
            title: 'Comment sont calculés les indicateurs / indices ?',
            content: (
              <p>
                Chaque indicateur et indice est accompagné d&apos;un texte descriptif &quot;Comment
                sont calculés ces indicateurs ? D&apos;où viennent ces données ?&quot;, souvent
                rétracté pour ne pas perturber la lecture globale de la page. Cliquez sur le chevron
                en haut à droite des blocs de texte pour afficher/masquer le contenu.
              </p>
            ),
          },
          {
            title:
              "Pourquoi ne pas afficher le nombre de déclarations d'effets indésirables par an au lieu d'une tranche sur 5 ans ?",
            content: (
              <p>
                Pour certains médicaments, très peu de prescriptions sont effectuées, le nombre de
                déclarations est donc très faible, en-dessous de 11 déclarations / an. Afin de
                respecter le secret médical et éviter toute dentification possible, les médicaments
                avec moins de 11 cas de déclarations ne sont pas affichés sur data.ansm <br /> Le
                regroupement par tranche de 5 ans permet d&apos;augmenter le nombre total sur la
                période et de rendre la réinditification du patient impossible.
              </p>
            ),
          },
          {
            title: "Qu'est-ce qu'un cas grave ? Où voir le détail ?",
            content: (
              <p>
                La définition de gravité en Pharmacovigilance est très précise : est considéré comme
                grave une effet entrainant la mort / susceptible de mettre en jeu le pronostic vital
                / entrainant une invalidité ou une incapacité importante ou durable / provoquant ou
                prolongeant une hospitalisation / se manifestant par une anomalie ou une
                malformation.
                <br /> Très fréquemment, les cas non graves ne sont pas déclarés car jugés non
                importants. Ce qui majore considérablement et artificiellement le rapport cas
                grave/non grave des déclarations d&apos;effets indésirables présents sur data.ansm.{' '}
                <br />
                Les critères des cas graves en pharmacovigilance sont affichés dans la{' '}
                <Link href="/src/pages/globaldec">
                  <a>section des données globales</a>
                </Link>
              </p>
            ),
          },
        ],
      },
      {
        title: 'Notice du médicament',
        id: 'notice-du-medicament',
        style: 'accordion',
        entries: [
          {
            title: 'Où trouver les indications sur la posologie ?',
            content: (
              <p>
                Les indications de posologies se trouvent dans la section 4.2 du RCP (Résumé des
                caractéristiques du produit), dans la Base de Données Publiques du Médicament. Pour
                chaque médicament, s&apos;il existe, data.ansm renvoie vers les RCP correspondants
                depuis l&apos;encart de description.
              </p>
            ),
          },
          {
            title: 'Où trouver les recommandations pour les enfants et les femmes enceintes ?',
            content: (
              <p>
                Les données d&apos;utilisation pour les enfants et les femmes enceintes se trouvent
                dans les sections 4.2 et 4.6 du RCP (Résumé des caractéristiques du produit), dans
                la Base de Données Publiques du Médicament. Pour chaque médicament, s&apos;il
                existe, data.ansm renvoie vers les RCP correspondants depuis l&apos;encart de
                description.
              </p>
            ),
          },
          {
            title: 'Où trouver les informations sur le stockage du médicament ?',
            content: (
              <p>
                Les indications de conservation se trouvent dans la section 6.4 du RCP (Résumé des
                caractéristiques du produit), dans la Base de Données Publiques du Médicament. Pour
                chaque médicament, s&apos;il existe, data.ansm renvoie vers les RCP correspondants
                depuis l&apos;encart de description.
              </p>
            ),
          },
        ],
      },
    ],
  },
  {
    index: 3,
    title: 'Données de pharmacovigilance',
    id: 'donnees-de-pharmacovigilance',
    parts: [
      {
        title: 'Pharmacovigilance',
        id: 'pharmacovigilance',
        style: 'accordion',
        entries: [
          {
            title: "Qu'est-ce que la pharmacovigilance ?",
            content: (
              <p>
                La pharmacovigilance française exerce une surveillance des effets indésirables
                pouvant survenir avec tous médicaments utilisés par les patients en France : elle
                s’intéresse aux effets indésirables survenant dans les conditions normales
                d’utilisation du médicament, mais aussi aux effets indésirables survenant dans le
                cadre d’erreurs médicamenteuses, d’abus, de mésusages, de surdosages et
                d’expositions professionnelles.
                <br />{' '}
                <a
                  rel="external noreferrer"
                  target="_blank"
                  href="https://ansm.sante.fr/qui-sommes-nous/nos-missions/assurer-la-securite-des-produits-de-sante/p/organiser-les-vigilances#pharmacovigilance"
                >
                  Voir la définition complète sur le site de l&apos;ANSM
                </a>
              </p>
            ),
          },
          {
            title: "Qu'est-ce que la balance bénéfice/risque ?",
            content: (
              <p>
                Le rapport bénéfice/risque est l&apos;évaluation des effets thérapeutiques du
                médicament, au regard du risque lié à l&apos;utilisation de ce médicament. <br />{' '}
                Une autorisation de mise sur le marché d&apos;un médicament est octroyé à un
                médicament si le rapport bénéfice/risque est jugé favorable. Celui-ci est amené à
                être réévalué tout au long de la vie du produit, comme dans le cas de
                l&apos;identification d&apos;un signal de sécurité.
              </p>
            ),
          },
          {
            title: "Qu'est-ce qu'un effet indésirable ?",
            content: (
              <div>
                <p>
                  Réaction nocive survenant chez un patient, un donneur vivant ou un receveur, liée
                  ou susceptible d&apos;être liée à un produit ou à une activité mentionnés aux
                  articles R.1211-29 et R.1211-30. Exemples : allergie à un PTA, un excipient
                  entraînant fièvre, frissons, ou douleur, érythème au site d&apos;injection,
                  kératite après greffe de cornée suite à une contamination du milieu de
                  conservation. <br /> Est considéré comme grave l&apos;effet indésirable selon le
                  code de la Santé publique (article R. 5121-152 du CSP):
                </p>
                <ul className="list-outside">
                  <li>Pouvant entraîner la mort</li>
                  <li>Ou susceptible de mettre en jeu le pronostic vital du patient</li>
                  <li>Ou entrainant une invalidité ou une incapacité importantes ou durables</li>
                  <li>Ou provoquant ou prolongeant une hospitalisation</li>
                  <li>Ou se manifestant par une anomalie ou une malformation congénitale.</li>
                </ul>
              </div>
            ),
          },
        ],
      },
      {
        title: 'Déclarer un effet indésirable',
        id: 'declarer-un-effet-indesirable',
        style: 'accordion',
        entries: [
          {
            title: 'Qui peut déclarer un effet indésirable ?',
            content: (
              <p>
                Toute personne peut déclarer un effet indésirable dès lors qu&apos;il a été
                identifé. Patients, Professionnels de santé peuvent le faire via le portail des
                signalements. Voir la section consacrée sur le site de l&apos;ANSM
                <br />
                <a
                  rel="external noreferrer"
                  target="_blank"
                  href="https://ansm.sante.fr/documents/reference/declarer-un-effet-indesirable"
                >
                  Voir la section consacrée sur le site de l&apos;ANSM
                </a>
              </p>
            ),
          },
          {
            title:
              'Comment déclarer un effet indésirable ? Dans quel cas déclarer un effet indésirable ?',
            content: (
              <div>
                <p>
                  En fonction de la personne qui déclare, plusieurs procédures ont été mises en
                  place sur le site ansm.sante.fr afin de vous guider vers le portail ministériel de
                  déclarations :{' '}
                </p>
                <ul className="list-outside">
                  <li>
                    Vous êtes patient ?{' '}
                    <a
                      rel="external noreferrer"
                      target="_blank"
                      href="https://ansm.sante.fr/documents/reference/declarer-un-effet-indesirable/comment-declarer-si-vous-etes-patient-ou-usager"
                    >
                      Comment déclarer si vous êtes patient ou usager ?{' '}
                    </a>
                  </li>
                  <li>
                    Vous êtes professionel de santé ?{' '}
                    <a
                      rel="external noreferrer"
                      target="_blank"
                      href="https://ansm.sante.fr/documents/reference/declarer-un-effet-indesirable/comment-declarer-si-vous-etes-professionnel-de-sante"
                    >
                      Comment déclarer si vous être professionel de santé ?
                    </a>
                  </li>
                </ul>
              </div>
            ),
          },
          {
            title: 'A quel moment vais-je voir ma déclaration sur data.ansm ?',
            // TODO voir les liens
            content: (
              <p>
                Aucune donnée individuelle ne sera affichée sur data.ansm par mesure de
                confidentialité. Chaque déclaration participe aux données à partir desquelles sont
                évaluées la tolérance.
                <br /> Par ailleurs data.ansm affiche les données de la BNPV et du SNDS entre les
                périodes de 2014-2018 pour le moment. Les équipes travaillent un projet de mise à
                jour de ces données.
              </p>
            ),
          },
        ],
      },
    ],
  },
  {
    index: 4,
    title: 'Données de ruptures de stock',
    id: 'donnees-de-ruptures-de-stock',
    parts: [
      {
        title: "Médicaments d'Intérêt Thérapeutique Majeur",
        id: 'medicaments-d-interet-therapeutique-majeur',
        style: 'accordion',
        entries: [
          {
            title: "Qu'est-ce qu'un MITM ? Comment est-il défini ?",
            content: (
              <p>
                On entend par médicaments ou classes de médicaments d&apos;intérêt thérapeutique
                majeur les médicaments (MITM) ou classes de médicaments pour lesquels une
                interruption de traitement est susceptible de mettre en jeu le pronostic vital des
                patients à court ou moyen terme, ou représente une perte de chance importante pour
                les patients au regard de la gravité ou du potentiel évolutif de la maladie.
              </p>
            ),
          },
          {
            title: 'Quelles sont les obligations de déclaration de rupture de stock ?',
            content: (
              <p>
                Les laboratoires pharmaceutiques sont tenus d&apos;informer l&apos;ANSM de toute
                rupture ou risque de rupture de stock de médicament (impossibilité de fabriquer ou
                d&apos;exploiter un médicament) dès qu&apos;ils en ont connaissance. L&apos;article
                R5124-49-1 mentionne cette obligation dans le paragraphe II{' '}
                <a
                  rel="external noreferrer"
                  target="_blank"
                  href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032926283/"
                >
                  du Code de la santé publique{' '}
                </a>{' '}
                <br />
                Cette déclaration se fait sur la plateforme de télédéclaration TRUSTMED depuis le 3
                mai 2021.
              </p>
            ),
          },
          {
            title:
              'Quelles sont les obligations de gestion de stock pour les laboratoires pharmaceutiques ?',
            content: (
              <div>
                <p>
                  Le décret n° 2021-349 instaurant l’obligation pour les entreprises pharmaceutiques
                  de constituer un stock de sécurité pour tous les médicaments destinés au marché
                  national a été publié le 30 mars 2021 et entrera en vigueur le 1er septembre 2021.
                </p>
                <p>
                  Les mesures mises en place par ce décret permettent de prévenir plus efficacement
                  les ruptures de stock des médicaments essentiels commercialisés en France. <br />{' '}
                  Le décret prévoit notamment l&apos;élaboration par les industriels de plans de
                  gestion des pénuries (PGP) pour tous les médicaments d’intérêt thérapeutique
                  majeur (MITM). Ces PGP permettent de prévenir les ruptures de stocks et, en cas de
                  difficultés d’approvisionnement, d’apporter dans les meilleurs délais des
                  solutions pour assurer la continuité des traitements pour les patients concernés.
                </p>
                <p>
                  Les industriels devront également constituer un stock de sécurité pour tous les
                  MITM qu’ils commercialisent en France.
                  <br />
                  <a
                    rel="external noreferrer"
                    target="_blank"
                    href="https://ansm.sante.fr/page/informations-relatives-au-decret-ndeg-2021-349-du-30-03-2021"
                  >
                    En savoir plus via le site de l&apos;ANSM
                  </a>
                </p>
              </div>
            ),
          },
          {
            title: "Qu'en est-il des autres médicaments ? Comment sont-ils suivis ?",
            content: (
              <p>
                Les missions de l&apos;ANSM sont focalisées sur les médicaments les plus essentiels
                appelés MITM (médicaments d&apos;intérêt thérapeutique majeur). Les signalements de
                ruptures ou de risques de ruptures par les laboratoires portent uniquement sur ces
                médicaments. Les autres médicaments sont suivis directement par l&apos;outil
                DP-Ruptures mis en place par le Conseil National de l&apos;Ordre des Pharmaciens.{' '}
                <br /> Cet outil permet aux pharmaciens d&apos;officine et hospitaliers de déclarer
                aux laboratoires une rupture d&apos;approvisionnement. Le laboratoire concerné
                apporte une réponse par cet outil aux pharmaciens concernés.
              </p>
            ),
          },
          {
            title: 'Comment savoir si mon médicament est un MITM ? Existe t-il une liste ?',
            disabled: true, // TODO contenu
            content: <p />,
          },
        ],
      },
      {
        title: 'Ruptures de stock',
        id: 'ruptures-de-stock',
        style: 'accordion',
        entries: [
          {
            title:
              "Je n'ai pas pu récupérer mon médicament en pharmacie car mon pharmacien m'a indiqué qu'il y a un manque d'approvisionnement, mais je ne retrouve pas l'information sur data.ansm, est-ce normal ?",
            content: (
              <div>
                <p>
                  data.ansm a pour objectif de présenter des données globales et d&apos;historique
                  sur les ruptures et risques de ruptures de stock des Médicaments d&apos;Intérêt
                  Thérapeutique Majeur (MITM). L&apos;information sur les ruptures et risques de
                  rupture de stocks de MITM faisant l&apos;object de mesures palliatives est
                  disponible sur{' '}
                  <a
                    rel="external noreferrer"
                    target="_blank"
                    href="https://ansm.sante.fr/disponibilites-des-produits-de-sante/medicaments"
                  >
                    le site de l&apos;ANSM
                  </a>
                </p>
                <p>
                  Si le médicament n&apos;est pas un MITM, l&apos;information sur sa disponibilité
                  ne sera présente ni sur le site{' '}
                  <a rel="external noreferrer" target="_blank" href="https://ansm.sante.fr/">
                    ansm.sante.fr
                  </a>
                  , ni sur{' '}
                  <a rel="external noreferrer" target="_blank" href="https://data.ansm.sante.fr/">
                    data.ansm.sante.fr
                  </a>
                </p>
                <p>
                  En 2021, l&apos;ANSM s&apos;est dôtée d&apos;une plateforme de télédéclaration
                  (Trustmed) obligatoire par les laboratoires pharmaceutiques qui lui permet à
                  partir de cette date de présenter l&apos;historique des ruptures et risques de
                  rupture. L&apos;ANSM prend également en charge les signalements de rupture de
                  stock observés par les patients, si vous souhaitez signaler un manque de
                  médicament, veuillez écrire au guichet usager à l&apos;adresse :{' '}
                  <a rel="external noreferrer" target="_blank" href="https://ansm.sante.fr/contact">
                    https://ansm.sante.fr/contact
                  </a>
                </p>
              </div>
            ),
          },
          {
            title:
              "Quelles situations font l'objet d'une déclaration et sont enregistrées dans les bases de l'ANSM ?",
            content: (
              <div>
                <p>
                  sont enregistrées dans les bases de l&apos;ANSM ? Les risques de rupture de stock
                  de médicament d&apos;interet thérapeutique majeur (MITM) : dès qu&apos;un
                  laboratoire pharmaceutique anticipe une difficulté d&apos;approvisionnement pour
                  un médicament il doit le déclarer à l&apos;ANSM afin qu&apos;elle puisse
                  s&apos;assurer que toutes les mesures adaptées ont été mises en oeuvre pour éviter
                  une rupture de stock. Il s&apos;agit de la majorité des déclarations.
                </p>
                <p>
                  Les ruptures de stock avérées de médicament d&apos;interet thérapeutique majeur
                  (MITM) : il arrive dans certains cas que le laboratoire pharmaceutique ne puisse
                  pas anticiper la rupture de stock, dans le cas par exemple d&apos;une difficulté
                  imprévisible ou d&apos;une augmentation des besoins soudaine, il doit dans ce cas
                  le déclarer au plus tôt à l&apos;ANSM afin qu&apos;elle puisse s&apos;assurer que
                  toutes les mesures adaptées ont été mises en oeuvre pour pallier cette rupture de
                  stock.
                </p>
              </div>
            ),
          },
          {
            title:
              "Quel est l'intérêt de montrer publier des informations sur les ruptures de stock antérieures ?",
            content: (
              <p>
                L&apos;ANSM s&apos;inscrit dans une démarche d&apos;ouverture des données aux
                usagers et fournit en open data des données qui leur permettent d&apos;avoir des
                informations sur les ruptures et risques de rupture de stock de médicaments
                d&apos;intérêt thérapeutique majeur au cours du temps.
              </p>
            ),
          },
          {
            title: 'Les données de rupture de stock publiées concernent quelles périodes ?',
            content: (
              <p>
                Les données globales sur les ruptures de stock débutent en 2014 et les données
                précises sur les actions et mesures réalisées par l&apos;ANSM pour pallier les
                ruptures de stock de médicaments d&apos;intérêts thérapeutiques majeurs commencent à
                partir de mai 2021.
              </p>
            ),
          },
          {
            title: 'Quelles sont les conséquences pour le patient ?',
            content: (
              <div>
                <p>
                  Les laboratoires pharmaceutiques sont responsables de la disponibilité des
                  médicaments qu’ils commercialisent. L&apos;ANSM évalue, valide et coordonne, si
                  nécessaire, les actions qui doivent être menées par les laboratoires
                  pharmaceutiques afin de sécuriser l’accès pour les patients aux médicaments
                  d&apos;intérêt thérapeutique majeur en rupture de stock ou pour lesquels il existe
                  un risque de rupture de stock.
                  <br /> S&apos;il s&apos;agit d&apos;un risque de rupture, les conséquences pour le
                  patient sont habituellement nulles. Dans certains cas il peut être nécessaire de
                  se rendre plus souvent à la pharmacie en raison d&apos;une plus petite quantité du
                  médicament délivrée lors de chaque renouvellement.
                </p>
                <p>
                  S&apos;il s&apos;agit d&apos;une rupture effective, dans certains cas son
                  médicament sera remplacé par un médicament équivalent ou similaire, ou encore il
                  devra retourner voir son médecin pour modifier son traitement. Dans tous les cas,
                  les professionnels de santé concernés (prescripteurs, pharmaciens, professionnels
                  de santé qui administrent le traitment, etc) ainsi que les associations de patient
                  sont consultés en amont dans la mesure du possible et informés des mesures mises
                  en place et le cas échéant des modalités particulières de mise à disposition du
                  produit.
                </p>
              </div>
            ),
          },
          {
            title:
              'Je souhaite être informé des ruptures de stock et de la remise à disposition pour un médicament spécifique',
            content: (
              <p>
                Actuellement, il n&apos;est pas possible de créer une alerte pour un médicament en
                particulier. Toutefois, vous avez la possilibité de{' '}
                <a
                  rel="external noreferrer"
                  target="_blank"
                  href="https://ansm.sante.fr/newsletter/"
                >
                  créer une veille personnalisée sur le site de l&apos;ANSM{' '}
                </a>{' '}
                pour être informé des ruptures de stock et des risques de ruptures de stock.
              </p>
            ),
          },
        ],
      },
      {
        title: 'Mesures et actions pour pallier les ruptures de stock',
        id: 'mesures-et-actions-pour-pallier-les-ruptures-de-stock',
        style: 'accordion',
        entries: [
          {
            title:
              "Qu'est-ce qu'une mesure, une action que l'ANSM met en place pour pallier les ruptures de stock ?",
            content: (
              <div>
                <p>
                  L’ANSM veille à la disponibilité des médicaments « essentiels » appelés MITM
                  (médicaments d&apos;intérêt thérapeutique majeur) ou ceux dont
                  l&apos;indisponibilité peut entraîner un risque de santé publique.
                </p>
                <p>
                  Elle évalue, valide et coordonne, si nécessaire, les actions qui doivent être
                  menées par les laboratoires pharmaceutiques afin de sécuriser l’accès à ces
                  médicaments pour les patients. En effet, les laboratoires pharmaceutiques sont
                  responsables de la disponibilité des médicaments qu’ils commercialisent.
                </p>
                <p>
                  Plusieurs mesures peuvent être mises en oeuvre pour pallier ou pour éviter la
                  rupture:
                </p>
                <ul className="list-outside">
                  <li>
                    Contingentement quantitatif : mise en place d’une distribution limitée en
                    quantité pour permettre une répartition harmonieuse des stocks.
                  </li>
                  <li>
                    Contingentement qualitatif : mise en place d’une priorisation de l’utilisation
                    du médicament pour certaines populations de patients en accord avec l’ANSM après
                    consultation des associations de patients et professionnels de santé.
                  </li>
                  <li>
                    Restriction du circuit de distribution : restriction de la distribution aux
                    pharmacies de ville ou aux pharmacies hospitalières.
                  </li>
                  <li>
                    Mise en place d&apos;un stock de dépannage : réserve d’un stock très limité afin
                    de répondre aux besoins urgents.
                  </li>
                  <li>
                    {' '}
                    Importation : importation de médicaments identiques ou similaires de l’étranger
                    autorisée par l’ANSM.
                  </li>
                  <li>
                    Flexibilité réglementaire : dérogation ponctuelle à la réglementation du
                    médicament autorisée par l’ANSM.
                  </li>
                  <li>
                    Recommandations de changement de médicament : remplacement du médicament par un
                    autre médicament équivalent ou similaire, ou dans les cas extrêmes par un
                    traitement différents après avis médical
                  </li>
                </ul>
              </div>
            ),
          },
          {
            title:
              "Quelles peuvent êtres les causes d'une rupture de stock ou d'un risque de rupture de stock de médicament ?",
            content: (
              <div>
                <p>
                  {' '}
                  Les causes déclarées de rupture de stock ou de risque de rupture de stock peuvent
                  être en particulier :
                </p>
                <ul className="list-outside">
                  <li>Un manque de matière première ou d&apos;article de conditionnement</li>
                  <li>Un probléme de production</li>
                  <li>
                    Une capacité d eproduction qui ne correspond plus au besoin parce-qu&apos;il a
                    par exemple fortement augmenté en peu de temps
                  </li>
                  <li>
                    Un médicament qui n&apos;est pas conforme aux cractéristiques attendues et ne
                    peut ainsi être commercialisé.
                  </li>
                </ul>
              </div>
            ),
          },
        ],
      },
    ],
  },
  {
    index: 5,
    title: 'Contribuer',
    id: 'contribuer',
    parts: [
      {
        title: 'Aider à améliorer le site',
        id: 'aider-a-ameliorer-le-site',
        style: 'accordion',
        entries: [
          {
            title:
              "Je souhaite contribuer à l'amélioration du site / Je souhaite devenir beta-testeur / faire partie d'un groupe de travail / d'experts",
            content: (
              <div>
                <p>Il y a plusieurs manières de contribuer à l&apos;amélioration du site:</p>
                <ul className="list-outside">
                  <li>
                    <strong>Devenir beta-testeur:</strong> Vous serez sollicité pour tester les
                    futurs produits/sites/applications en cours de réalisation par l&apos;ANSM. Vous
                    serez soit accompagné par un designer ou chargé d&apos;étude qui mènera le test
                    à distance ou en présentiel, soit un formulaire vous sera envoyé pour tester le
                    produit en autonomie.
                  </li>
                  <li>
                    <strong>Faire partie d&apos;un groupe de travail / d&apos;experts:</strong> Vous
                    participerez à des ateliers de travail en groupe organisés par l&apos;ANSM,
                    autour de thématiques précises, où des animateurs vous demanderons de vous
                    exprimer et vous aurez la possibilité d&apos;échanger avec d&apos;autres
                    participants.
                  </li>
                  <li>
                    <strong>Participer à des enquêtes et entretiens:</strong>Vous serez contacté
                    pour participer à diverses études qui ont pour objectf de permettre à
                    l&apos;ANSM de mieux vous connaitre sur des sujets précis, recueillir vos avis,
                    connaitre vos habitudes, freins et besoins. Cela peut prendre la forme
                    d&apos;entretiens indviduels, d&apos;études ethnographiques, journaux de
                    bords,...
                  </li>
                </ul>
                <p>
                  <a rel="external noreferrer" target="_blank" href="https://ansm.sante.fr/contact">
                    Contacter nous via le formulaire
                  </a>
                </p>
              </div>
            ),
          },
          {
            title: 'Qui peut contribuer ?',
            content: (
              <p>
                Tout le monde peut contribuer dans le respect du code déontologique de l&apos;ANSM.{' '}
                <br />{' '}
                <a
                  rel="external noreferrer"
                  target="_blank"
                  href="https://ansm.sante.fr/qui-sommes-nous/deontologie-et-transparence/deontologie-et-transparence/p/nos-exigences-deontologiques"
                >
                  Voir la rubrique Déontologie et Transparence sur le site de l&apos;ANSM
                </a>
              </p>
            ),
          },
          {
            title: "J'ai une suggestion d'amélioration pour data.ansm, où puis-je l'adresser ?",
            content: (
              <p>
                Une idée ? Une remarque ? Vous pouvez nous l&apos;adresser via{' '}
                <a rel="external noreferrer" target="_blank" href="https://ansm.sante.fr/contact">
                  notre formulaire de contact
                </a>
                .
              </p>
            ),
          },
        ],
      },
    ],
  },
];
