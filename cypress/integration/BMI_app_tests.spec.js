/// <reference types="cypress" />

import messages from '//test_automation_project/cypress/fixtures/messages.json';
import fieldsBMI from '//test_automation_project/cypress/pageObject/fieldsBMI';
const fields = new fieldsBMI();

context('Test automation project based on my BMI app', () => {
    describe('BMI APP Tests', {tags: 'local'}, () => {
        beforeEach('Enter BMI App page', ()=> {
                cy.visit('/');
                cy.url().should('contain', 'piotrmr20.github.io/BMI_app/');
                cy.fixture('messages.json').as('weightOrHeightMessage');
    })
        it('Test 1 of main modules displaying', () => {
            cy.visit('/');
            cy.url().should('contain', 'piotrmr20.github.io/BMI_app/');
            cy.get('.moduly > :nth-child(1)').should('be.visible');
            cy.get('.moduly > :nth-child(2)').should('be.visible');
            cy.get('.moduly > :nth-child(3)').should('be.visible');
        })
        it('Test 2 of inputs fields being empty', ()=> {
            fields.selectInputWeightField().should('have.value', "");
            fields.selectInputHeightField().should('have.value', "");
        })
        it('Test 3 of button click with empty inputs', ()=> {
            fields.selectButton().click();
            fields.selectWeightOutputField().should('have.text', messages[0].message);
            fields.selectHeightOutputField().should('have.text', messages[1].message);
            fields.selectBMIoutputField().should('have.text', 'Błąd!');
        })
        it('Test 4 with correct input values (weight: 40-200, height: 120-240)', ()=> {
            fields.selectInputWeightField().clear().type('85');
            fields.selectInputHeightField().clear().type('190');
            fields.selectButton().click().wait(100);
            fields.selectWeightOutputField().should('contain', 85);
            fields.selectHeightOutputField().should('contain', 190);
            fields.selectBMIoutputField().should('contain', 23.55);
        })
        it('Test 5 with correct input values (weight: 40-200, height: 120-240, float numbers with .)', ()=> {
            fields.selectInputWeightField().clear().type('70.6');
            fields.selectInputHeightField().clear().type('189.7');
            fields.selectButton().click().wait(100);
            fields.selectWeightOutputField().should('contain', 70.6);
            fields.selectHeightOutputField().should('contain', 189.7);
            fields.selectBMIoutputField().should('contain', 19.62);
        })
        it('Test 6 with correct input values (weight: 40-200, height: 120-240, float numbers with ,)', ()=> {
            fields.selectInputWeightField().clear().type('70,6');
            fields.selectInputHeightField().clear().type('189,7');
            fields.selectButton().click().wait(100);
            fields.selectWeightOutputField().should('contain', 70);
            fields.selectHeightOutputField().should('contain', 189);
            fields.selectBMIoutputField().should('contain', 19.6);
        })
        it('Test 7 incorrect input values out of scope (weight: 40-200, height: 120-240)', ()=> {
            fields.selectInputWeightField().clear().type('300');
            fields.selectInputHeightField().clear().type('100');
            fields.selectButton().click();
            fields.selectWeightOutputField().should('have.text', messages[0].message);
            fields.selectHeightOutputField().should('have.text', messages[1].message);
            fields.selectBMIoutputField().should('have.text', 'Błąd!');
        })
        it('Test 8 incorrect input values (not a numbers))', ()=> {
            fields.selectInputWeightField().clear().type('abcdefghijk');
            fields.selectInputHeightField().clear().type('lmnoprstuwxyz');
            fields.selectButton().click().wait(100);
            fields.selectWeightOutputField().should('have.text', messages[0].message);
            fields.selectHeightOutputField().should('have.text', messages[1].message);
            fields.selectBMIoutputField().should('have.text', 'Błąd!');
        })
        it('Test 9 incorrect input values (only spaces))', ()=> {
            fields.selectInputWeightField().clear().type('   ');
            fields.selectInputHeightField().clear().type('   ');
            fields.selectButton().click().wait(100);
            fields.selectWeightOutputField().should('have.text', messages[0].message);
            fields.selectHeightOutputField().should('have.text', messages[1].message);
            fields.selectBMIoutputField().should('have.text', 'Błąd!');
        })
        it('Test 10 for correct BMI calculations', ()=> {
            fields.selectInputWeightField().clear().type('70');
            fields.selectInputHeightField().clear().type('189');
            fields.selectButton().click().wait(100);
            fields.selectBMIoutputField().should('contain', 19.6);
        })
        it('Test 11 for BMI rising or decreasing', ()=> {
            fields.selectInputWeightField().clear().type('70');
            fields.selectInputHeightField().clear().type('189');
            fields.selectButton().click().wait(100);
            fields.selectInputWeightField().clear().type('75');
            fields.selectInputHeightField().clear().type('189');
            fields.selectButton().click().wait(100);
            cy.get('#statusBMI').should('contain.text', 'TWOJE BMI WZROSŁO!');
            fields.selectInputWeightField().clear().type('65');
            fields.selectInputHeightField().clear().type('189');
            fields.selectButton().click().wait(100);
            cy.get('#statusBMI').should('contain.text', 'TWOJE BMI SPADŁO');
        })
        it('Test 12 for history button creating', ()=> {
            fields.selectInputWeightField().clear().type('70');
            fields.selectInputHeightField().clear().type('189');
            fields.selectButton().click().wait(100);
            cy.get('#listaWynikow > :nth-child(1)').should('be.visible');
        })
        it('Test 13 for BMI average calculations', ()=> {
            fields.selectInputWeightField().clear().type('70');
            fields.selectInputHeightField().clear().type('189');
            fields.selectButton().click().wait(100);
            fields.selectInputWeightField().clear().type('75');
            fields.selectInputHeightField().clear().type('189');
            fields.selectButton().click().wait(100);
            fields.selectInputWeightField().clear().type('65');
            fields.selectInputHeightField().clear().type('189');
            fields.selectButton().click().wait(100);
            cy.get(':nth-child(3) > p').should('contain', 19.6);
        })
        it('Test 14 for clearing the history', ()=> {
            fields.selectInputWeightField().clear().type('70');
            fields.selectInputHeightField().clear().type('189');
            fields.selectButton().click().wait(100);
            fields.selectInputWeightField().clear().type('75');
            fields.selectInputHeightField().clear().type('189');
            fields.selectButton().click().wait(100);
            cy.get('#clearing').click();
            cy.get('#listaWynikow > :nth-child(1)').should('not.exist');
        })
        it('Test 15 for restoring history data', ()=> {
            fields.selectInputWeightField().clear().type('70');
            fields.selectInputHeightField().clear().type('189');
            fields.selectButton().click().wait(100);
            fields.selectInputWeightField().clear().type('75');
            fields.selectInputHeightField().clear().type('189');
            fields.selectButton().click().wait(100);
            cy.get('#listaWynikow > :nth-child(2)').click();
            fields.selectWeightOutputField().should('contain', 75);
            fields.selectHeightOutputField().should('contain', 189);
        })

    })
    
})