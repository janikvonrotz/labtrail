# TODO

## Deployment

## Management

- [ ] Quiz mit Forms?
- [ ] Sebi Datainput
- [ ] Fix dates for security audit

## Design

- [ ] Change logo colors -> create svg

## Testing

- [ ] Advanced tests #lowprio
- [ ] Basic React Test with jest and apollo mock #lowprio
- [ ] Test sorting

## Search

- [ ] Filter search results by role #prio
- [ ] Clear input box on setQuery

## Code

## User Management

- [ ] Enable Registration #proposal

## Filter and Sort

- [ ] Add table pagination #define strategy
- [ ] Sort nested objects on client side -> fix switching

## Content

- [ ] Add about page and reference apland

## Logging

- [ ] Setup sentry integration for logging and analytics

## Hosting

- [ ] Setup kubernetes cluster and deploy with helm scripts?! or simply with Ansible #education

## UX

- [ ] Shorten url link on documents and make clickable

## Bugs

- [x] Delete prompt automatially opens and cannot be closed
- [ ] Resolve Error: Store reset while query was in flight (not completed in link chain) on Settings update
- [ ] Fix select box referesh on pages without redirect
- [x] Fix User Update controlled password problem
- [ ] Catching the token expired error ignores all errors
- [ ] If submit is propagated from child form the schema required definition are ignored!?

## Security

- [ ] Custom fields bypassing schema hasRole directive

# Minor

- [ ] Add Breadcrumbs https://material-ui.com/components/breadcrumbs/#integration-with-react-router
- [ ] Add documentations to directives
- [ ] Rename document title to name and checkout how graphql schema updates work

## Enhancements

- [ ] Fix those validate chains with ES7`: `data && data.search && data.search.length` -> `data?.search?.length` 
- [ ] create LocalStorage hook https://github.com/streamich/react-use, https://blog.bitsrc.io/writing-your-own-custom-hooks-4fbcf77e112e

# DONE

- [x] Persist database #topprio
- [x] Deploy new release
- [x] Install for ZHAW
- [x] Publish docker images https://help.github.com/en/github/managing-packages-with-github-packages/configuring-docker-for-use-with-github-packages
- [x] Search when pressing enter -> no debounce and instant search #prio
- [x] Ensure to improve performance -> check query search
- [-] Hide search results if input box looses focus; use onBlur is too fast
- [x] Move api code into src folder
- [x] Dokumente in Stationsansicht erfassen
- [x] Upload code to ZHAW GitHub
- [x] Add table sort feature
- [x] Add select list sort 
- [x] Ensure save button is always first in row -> default on enter
- [x] Format success alert message
- [x] Hide logout button on mobile behind dots menu -> Move logout button to menu
- [x] Write a markdown guide and integrate it under help section
- [x] GitHub action badge show no status
- [x] QR-Code color add black
- [x] Copy QR-code image with text to clipboard
- [x] Bump to node 12.x
- [x] Update screenshot
- [x] wordwrap for qrcode links on mobile
- [x] Hide search immediately on click
- [x] Remove query if result clicked
- [x] Do not show empty results while search is running
- [x] Enable travis or circle ci or GitHub action
- [x] User Account löschen
- [x] Manage Tenant assigned Users
- [x] Fix layout
- [x] Finish search feature
- [x] Where is the tenant role
- [x] Change max width of login -> create login dialog box
- [x] Change color according ZHAW CI/CD
- [x] Fachgruppe Bioproz erwähnen -> https://3dchemie.lsfm.zhaw.ch/impressum
- [x] Script that copies data from prod to test
- [x] Setup graphql integration tests
- [x] Setup basic CRUD tests
- [x] Setup docker images and nginx proxy
- [x] Heidi Strahm hosting kontaktieren
- [x] Offerte anpassen
- [x] Neue Offerte mit Hosting und Hostingkonzept
- [x] Update Menu with arrow
- [x] Add global search for all types Result { title, content, type, link } - search(contains: "keyword")
     Return list `position: absolute; top: 100%; z-index: 100; left: 0px; right: auto; display: none;` 
     https://www.apollographql.com/docs/apollo-server/schema/unions-interfaces/ and debounce from lodash
     https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci
- [x] Fix error with createAlert loop -> Write directly?
- [x] Refresh get current user query on logout
- [x] Add about page with GitHub link
- [x] FIX making user.password uncontrolled when update user
- [x] make created_by and updated_by resolvable
- [x] Enable password reset on updateUserProfile
- [x] Fix error if token invalidates
- [x] Hide menus if no permission
- [x] Create custom query to get redirect document and prevent access to stations and documents by default
- [x] Ensure access permissions with Role Admin, Manager and User
- [x] Add QR Redirect with follow and not follow create /qr node app that gets data from api via fetch and create custom query for document url and follow?
- [x] Create QR Code printer for all stations https://github.com/rosskhanas/react-qr-code
- [x] Add active category for tenant
- [x] Create user management view
- [x] change theme color
- [-] create table builder
- [-] Adjust Price in Offerte
- [-] Add nginx conf and server.js to run everything as server
- [x] Update headerloginbutton when login
- [x] Fix Get nested document ids 
- [x] Add settings page to switch tenants
- [x] Create assignedTenant query and create user list for tenant
- [x] Fix get created and updated by user
- [x] Set default cache on store reset
- [x] Create basic app with User, Station, Document, Category and Tenant
- [x] Filter all data by tenant
- [-] Create Trail and use StationTransferList
- [x] Select documents in station view with DocumentTransferList
- [x] Finish Station CRUD
- [x] Add error message -> or Redirect with success message
- [x] Delete Prompt Dialog -> Did not work *shrug* -> event.preventDefault was missing
- [x] Alert on save, delete and create.
- [x] Set header title and favicon
- [x] Fix refresh after single station item edit
- [x] Fix add station with document selection
- [-] Enable sortable document list
- [x] created_by must be user id
- [x] Create proof of concept with login, saml and qr code.
- [x] Configure eslint for api and auth
- [x] Login and Logout method
- [x] Checkout Moodle and treasure hunt plugin
- [x] QR Code scanning with Android?
- [x] Send Konzept, Vorgehen mit Offerte to Lukas
- [x] Anforderungen Referenzieren
- [x] Referenzen zusammenstellen
- [x] Ask before holidays august. Auftragsvergabe in den nächsten Wochen.
- [x] Get ZHAW SWITCHaai contact
- [x] Get ZHAW infra and mail send contact
- [x] Ask Sebi about document and video publish
- [x] Ask ZHAW contact
- [x] Offerte übearbeiten
