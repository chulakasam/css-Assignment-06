export class customer{
    constructor(cus_id,cus_name,cus_address,cus_tel,cus_date) {
        this._cus_id=cus_id;
        this._cus_name=cus_name;
        this._cus_address=cus_address;
        this._cus_tel=cus_tel;
        this._cus_date=cus_date;
    }
    get cus_id(){
        return this._cus_id;
    }
    set cus_id(cus_id){
        this._cus_id=cus_id;
    }

    get cus_name(){
        return this._cus_name;
    }
    set cus_name(cus_name){
        this._cus_name=cus_name;
    }

    get cus_address(){
        return this._cus_address;
    }
    set cus_address(cus_address){
        this._cus_address=cus_address;
    }

    get cus_tel(){
        return this._cus_tel;
    }
    set cus_tel(cus_tel){
        this._cus_tel=cus_tel
    }

    get cus_date(){
        return this._cus_date;
    }
    set cus_date(cus_date){
        this._cus_date=cus_date;
    }




}