describe("Prueba Pagina Demo QA", () => {

    beforeEach(() => {
        cy.visit("https://demoqa.com/")
    })

    Cypress.on('uncaught:exception', (err, runnable) => {            
        return false;
      });

    it("Validar Elements", () => {
        //Text Box
        cy.get(':nth-child(1) > :nth-child(1) > .card-body > h5').click()
        cy.get(':nth-child(1) > .element-list > .menu-list > #item-0 > .text').click()
        cy.get('#userName').type("Ejemplo")
        cy.get('#userEmail').type("Ejemplo@gmail.com")
        cy.get('#currentAddress').type("Carrera 12345")
        cy.get('#permanentAddress').type("Callle 1234")
        cy.get('#submit').click()
        //Check Box
        cy.get(':nth-child(1) > .element-list > .menu-list > #item-1 > .text').click()
        cy.get('.rct-collapse').click()
        cy.get(':nth-child(2) > .rct-text > label > .rct-title').click()
        cy.get(':nth-child(3) > .rct-text > label > .rct-title').click()
        //Radio Button
        cy.get(':nth-child(1) > .element-list > .menu-list > #item-2 > .text').click()
        cy.get('.col-md-6 > :nth-child(2) > :nth-child(2)').click()
        //Web Tables
        cy.get(':nth-child(1) > .element-list > .menu-list > #item-3 > .text').click()
        cy.get('#searchBox').type("Cierra").clear().type("Alden").clear().type("Kierra")        
        cy.get('#addNewRecordButton').click()
        cy.get('#firstName').type("Daniel")
        cy.get('#lastName').type("Bello")
        cy.get('#userEmail').type("dabg4635@gmail.com")
        cy.get('#age').type("29")
        cy.get('#salary').type("500000")
        cy.get('#department').type("Boyacá")    
        cy.get('#submit').click()
        cy.get('#searchBox').clear().type("Daniel")
        //Buttons
        cy.get(':nth-child(1) > .element-list > .menu-list > #item-4 > .text').click()
        cy.get('#doubleClickBtn').dblclick()
        cy.get('#rightClickBtn').rightclick()
        cy.get('[class="btn btn-primary"]').eq(2).click()
        cy.get('#dynamicClickMessage').should("be.visible")
        //Links
        cy.get(':nth-child(1) > .element-list > .menu-list > #item-5 > .text').click()    
        cy.get('#simpleLink').invoke('removeAttr', 'target')
        cy.get('#simpleLink').click()
        cy.go('back');
        cy.get('#dynamicLink').invoke('removeAttr', 'target')
        cy.get('#dynamicLink').click()
        cy.go('back');            
        cy.get('#created').click()            
        cy.get('#no-content').click()        
        cy.get('#moved').click()          
        cy.get('#bad-request').click()
        cy.get('#unauthorized').click()
        cy.get('#forbidden').click()
        cy.get('#invalid-url').click()
        cy.get('#created').should("be.visible")
        //Broken Links - Images
        cy.get(':nth-child(1) > .element-list > .menu-list > #item-6 > .text').click()        
        cy.get(':nth-child(2) > [src="/images/Toolsqa.jpg"]').should("be.visible")
        cy.get('[src="/images/Toolsqa_1.jpg"]').should("not.be.visible")
        cy.get('[href="http://demoqa.com"]').should('have.attr', 'href').and('include', "http://demoqa.com")
        //Upload And Download
        cy.get(':nth-child(1) > .element-list > .menu-list > #item-7 > .text').click()
        cy.get('#uploadFile').selectFile('cypress/fixtures/2399519.jpg')
        cy.get('#downloadButton').click()
        //Dynamic Properties
        cy.get(':nth-child(1) > .element-list > .menu-list > #item-8 > .text').click()
        cy.get('#enableAfter').wait(5000).click()
        cy.get('#enableAfter').should('exist')
        cy.wait(2000)
        cy.get('#visibleAfter').click().should('exist').contains('Visible After 5 Seconds')    
    })

    it("Validar Forms", () => {
        cy.get(':nth-child(2) > :nth-child(1) > .card-body > h5').click()
        cy.get(':nth-child(2) > .element-list > .menu-list > #item-0 > .text').click()
        cy.title().should('eq', 'DEMOQA')
        cy.get('h5').contains("Student Registration Form")
        cy.get('#firstName').type("Daniel")
        cy.get('#lastName').type("Bello") 
        cy.get('#userEmail').type("dabg4635@gmail.com") 
        cy.get('#genterWrapper > .col-md-9 > :nth-child(1) > .custom-control-label').click()
        cy.get('#userNumber').type("3143769793")
        cy.get('#dateOfBirthInput').type('{selectall} 30 Jul 1994 {enter}')
        cy.get('#hobbiesWrapper > .col-md-9 > :nth-child(3) > .custom-control-label').click()
        cy.get('#uploadPicture').selectFile('cypress/fixtures/2399519.jpg')
        cy.get('#currentAddress').type("Carrera 11 A # 19-69")
        cy.get('[style="text-align:center;display:block;max-width:970px;height:auto;overflow:hidden;margin:auto"] > :nth-child(4)').should('be.visible') 
    })

    it("Validacion - Alerts", () => {

        cy.get(':nth-child(3) > :nth-child(1) > .card-body > h5').click()
        cy.get(':nth-child(3) > .element-list > .menu-list > #item-1 > .text').click()
        cy.get('#alertButton').click().type('{enter}')
        cy.get('#timerAlertButton').click().wait(6000).type('{enter}')
        cy.on('window:confirm', () => false);
        cy.get('#confirmButton').click()
        cy.window().then((win) => {
        cy.stub(win, 'prompt').returns('Daniel')
        }); 
        cy.get('#promtButton').click()
        //Frames
        cy.get(':nth-child(3) > .element-list > .menu-list > #item-2 > .text').click()
        cy.get('#frame1').invoke('text', 'Hola')
        //Nested Frames
        cy.get(':nth-child(3) > .element-list > .menu-list > #item-3 > .text').click()
        cy.get('#frame1').should("be.visible")
        //Modal Dialogs
        cy.get(':nth-child(3) > .element-list > .menu-list > #item-4 > .text').click()
        cy.get('#showSmallModal').click()
        cy.get('.modal-body').contains("This is a small modal. It has very less content")
        cy.get('#closeSmallModal').click()
        cy.get('#showLargeModal').click()
        cy.get('p').should("be.visible")
        cy.get('#closeLargeModal').click()
            
    })

    it("Validacion - Widgets", () => {
        cy.get(':nth-child(3) > :nth-child(1) > .card-body > h5').click()
        cy.get(':nth-child(4) > .group-header > .header-wrapper > .header-text').click()
        cy.get(':nth-child(4) > .element-list > .menu-list > #item-0 > .text').click()
        cy.get('#section1Heading').contains("What is Lorem Ipsum?")
        cy.get('#section1Heading').click()        
        cy.get('#section2Heading').click()
        cy.get('#section2Content > :nth-child(1)').should("be.visible")
        cy.get('#section2Heading').click()
        cy.get('#section3Heading').click()
        cy.get('#section3Content > p').should("be.visible")
        //Auto Complete
        cy.get(':nth-child(4) > .element-list > .menu-list > #item-1').click()
        cy.get('#autoCompleteMultipleContainer > .auto-complete__control > .auto-complete__value-container').type("Gree{enter}")
        cy.get('#autoCompleteMultipleContainer > .auto-complete__control > .auto-complete__value-container').click().type("Red{enter}")
        cy.get('#autoCompleteMultipleContainer > .auto-complete__control > .auto-complete__value-container').click().type("Blue{enter}")
        cy.get('#autoCompleteSingleContainer > .auto-complete__control > .auto-complete__value-container').type("Black{enter}")
        //Date Paicker
        cy.get(':nth-child(4) > .element-list > .menu-list > #item-2 > .text').click()
        cy.get('#datePickerMonthYearInput').type('{selectall} 30 Jul 1994 {enter}')
        cy.get('#dateAndTimePickerInput').type('{selectall} December 8, 2023 7:30 PM {enter}')
        //Slider(Pendiente)
        cy.get(':nth-child(4) > .element-list > .menu-list > #item-3 > .text').click()
        cy.get('.range-slider').invoke('val', '70').trigger('change')
        cy.get('#sliderValue').invoke('val', '70')
        cy.get('.range-slider').invoke('css', "range-slider__tooltip__label", '70')
        //Progress Bar
        cy.get(':nth-child(4) > .element-list > .menu-list > #item-4 > .text').click()
        cy.get('#startStopButton').click()
        cy.scrollTo("top");
        cy.wait(1500)
        cy.get('#startStopButton').click()
        cy.scrollTo("top");
        cy.wait(2000)
        cy.get('#startStopButton').click()
        cy.scrollTo("top");
        cy.wait(1000)
        cy.get('#startStopButton').click()
        cy.scrollTo("top");
        cy.wait(3000)
        cy.get('#startStopButton').click()
        //Tabs
        cy.get(':nth-child(4) > .element-list > .menu-list > #item-5 > .text').click()
        cy.get('#demo-tabpane-what > .mt-3').contains("Lorem Ipsum is simply dummy ")
        cy.get('#demo-tab-origin').click()
        cy.get('#demo-tab-use').click()
        cy.get('#demo-tabpane-use > .mt-3').should("be.visible")
        //Tool tips
        cy.get(':nth-child(4) > .element-list > .menu-list > #item-6 > .text').click()
        cy.get('#toolTipButton').trigger('mouseover')
        cy.get('#texToolTopContainer > :nth-child(1)').trigger('mouseover')
        cy.get('#texToolTopContainer > :nth-child(2)').trigger('mouseover')
        //Menu (Pendiente)
        //cy.get(':nth-child(4) > .element-list > .menu-list > #item-7 > .text').click()
        //cy.xpath("//a[contains(text(),'Main Item 2')]").invoke('show')
        //cy.contains("SUB SUB LIST »").trigger('mouseover')
        //Select Menu
        cy.get(':nth-child(4) > .element-list > .menu-list > #item-8 > .text').click()
        cy.get('#withOptGroup > .css-yk16xz-control > .css-1hwfws3').type("A root option {enter}").type("Group 2, option 2 {enter}").type("Group 1, option 1 {enter}")
        cy.get('#selectOne > .css-yk16xz-control > .css-1hwfws3').type("Ms.{enter}")
        cy.get('#oldSelectMenu').select('4').select('2').select('3').select('1')
        cy.get(':nth-child(7) > .col-md-6 > .css-2b097c-container > .css-yk16xz-control > .css-1hwfws3').type("Green {enter} Blue {enter}").type("Black {enter} Red {enter}") 
        cy.get('#cars')
        .select(['volvo', 'saab', 'opel', 'audi'])
    })
    it("Validar - Interactions", () => {
        cy.viewport(1200, 800);
        cy.get(':nth-child(5) > :nth-child(1) > .card-body > h5').click()
        //Selectable
        cy.get(':nth-child(4) > .group-header > .header-wrapper').click()
        cy.get(':nth-child(5) > .group-header > .header-wrapper').click()
        cy.get(':nth-child(5) > .element-list > .menu-list > #item-1 > .text').click()
        cy.get(':nth-child(5) > .element-list > .menu-list > #item-1 > .text').click()
        cy.get('#verticalListContainer .mt-2:nth-child(1), .mt-2:nth-child(2), .mt-2:nth-child(3), .mt-2:nth-child(4)').click({ multiple: true })
        cy.get('#verticalListContainer .mt-2:nth-child(1), .mt-2:nth-child(2), .mt-2:nth-child(3), .mt-2:nth-child(4)').click({ multiple: true })
        //Resizable
        cy.get(':nth-child(5) > .element-list > .menu-list > #item-2 > .text').click()
        cy.get('#resizableBoxWithRestriction')
        .invoke('css', 'width', '275px')
        .invoke('css', 'height', '280px')
        cy.get('#resizable')
        .invoke('css', 'width', '775px')
        .invoke('css', 'height', '112px')
        //Dropable
        cy.get(':nth-child(5) > .element-list > .menu-list > #item-3 > .text').click()
        cy.xpath('//*[@id="draggable"]').drag('#droppable',{force: true})
        cy.get('#droppableExample-tab-accept').click()
        cy.get('#acceptable').drag('#acceptDropContainer > #droppable',{force: true})
        cy.get('#droppableExample-tab-preventPropogation').click()
        cy.get('#dragBox').drag('#notGreedyDropBox',{force: true})
        cy.get('#dragBox').drag('#greedyDropBoxInner',{force: true})
        cy.get('#dragBox').drag('#greedyDropBox',{force: true})
        cy.get('#droppableExample-tab-revertable').click()
        cy.get('#revertable').drag('#revertableDropContainer > #droppable',{force: true})
        cy.get('#notRevertable').drag('#revertableDropContainer > #droppable',{force: true})
        //Draggable
        cy.viewport(1200, 800)
        cy.get(':nth-child(5) > .element-list > .menu-list > #item-4 > .text').click()
        cy.get('#dragBox')
        .invoke('css', 'left', '374px')
        .invoke('css', 'top', '2px')
        cy.get('#draggableExample-tab-axisRestriction').click()
        cy.get('#restrictedX')
        .invoke('css', 'left', '-115px')
        .invoke('css', 'top', '0px')
        cy.get('#restrictedY')
        .invoke('css', 'left', '0px')
        .invoke('css', 'top', '426px')
        cy.get('#draggableExample-tab-containerRestriction').click()
        cy.get('#containmentWrapper > .draggable')
        .invoke('css', 'left', '338px')
        .invoke('css', 'top', '106px')
        .invoke('css', 'left', '0px')
        .invoke('css', 'top', '106px')
        cy.get('.ui-widget-header')
        .invoke('css', 'left', '14px')
        .invoke('css', 'top', '86px')
        cy.get('#draggableExample-tab-cursorStyle').click()
        cy.get('#cursorCenter')
        .invoke('css', 'left', '199px')
        .invoke('css', 'top', '119px')
        cy.get('#cursorTopLeft')
        .invoke('css', 'left', '377.374px')
        .invoke('css', 'top', '-116px')
        cy.get('#cursorBottom')
        .invoke('css', 'left', '202px')
        .invoke('css', 'top', '153px')
        cy.get(':nth-child(5) > .group-header > .header-wrapper > .header-right > .icon').click()
        cy.viewport(900, 800)
    })

    it("Validar - Book Store Aplication", () => {
        cy.get(':nth-child(6) > :nth-child(1) > .card-body > h5').click()
        //Book Store Aplication
        cy.get(':nth-child(6) > .group-header > .header-wrapper > .header-text').click()
        cy.get(':nth-child(6) > .element-list > .menu-list > #item-0 > .text').click({force: true})
        cy.get('#newUser').click()
        cy.get('#firstname').type('Daniel')
        cy.get('#lastname').type('Bello')
        cy.get('#userName').type('dabg4635')
        cy.get('#password').type('9407')        
        //Book Store
        cy.get(':nth-child(6) > .element-list > .menu-list > #item-2 > .text').click({force: true})
        cy.contains('Git Pocket Guide').click()
        cy.go('back')
        cy.contains('Learning JavaScript Design Patterns').click({force:true})
        cy.viewport(900, 800)
        cy.go('back')
        cy.get(':nth-child(6) > .element-list > .menu-list > #item-3 > .text').click()
        cy.get('#notLoggin-label').should('be.visible')
    })


    
})