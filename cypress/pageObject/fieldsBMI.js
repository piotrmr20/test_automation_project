class fieldsBMI {
    _inputWeightField = '.pole1'; //propercja
    _inputHeightField = '.pole2'; //propercja
    _confirmButton = '.przycisk';
    _weightOutputField = '#podanaWaga';
    _heightOutputField = '#podanyWzrost';
    _BMIoutputField = '#twojeBMI';

    selectInputWeightField (){
        return cy.get(this._inputWeightField);
    }

    selectInputHeightField (){
        return cy.get(this._inputHeightField);
    }

    selectButton (){
        return cy.get(this._confirmButton);
    }
    
    selectWeightOutputField (){
        return cy.get(this._weightOutputField);
    }

    selectHeightOutputField (){
        return cy.get(this._heightOutputField);
    }

    selectBMIoutputField (){
        return cy.get(this._BMIoutputField);
    }

}
export default fieldsBMI;