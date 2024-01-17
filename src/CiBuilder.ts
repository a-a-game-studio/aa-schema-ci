
/** Правило CI */
export class CiRule {
    sKey = '';

    isBranchOk = false;

    /** init */
    constructor(sKey:string){
        this.sKey = sKey;
    }

    ixRule:Record<string, string[]> = {};

    /** В случае успещного выполнения считается что ветка собрана и контур рабочий */
    branchOk(){
        this.isBranchOk = true;
        return this;
    }

    /** Группа размещения */
    group(sRuleKey:string){
        this.ixRule.group = [sRuleKey];
        return this;
    }

    /** Установить группы размещения */
    groupList(asRuleKey:string[]){
        this.ixRule.group = asRuleKey;
        return this;
    }

    /** Список задач после выполнения */
    next(sRuleKey:string){
        this.ixRule.next = [sRuleKey];
        return this;
    }

    /** Список задач после выполнения */
    nextList(asRuleKey:string[]){
        this.ixRule.next = asRuleKey;
        return this;
    }

    /** Условия для ожидания */
    need(sRuleKey:string){
        this.ixRule.need = [sRuleKey];
        return this;
    }

    /** Условия для ожидания */
    needList(asRuleKey:string[]){
        this.ixRule.need = asRuleKey;
        return this;
    }

    /** Скрипт Shell для выполнения */
    script(sRuleKey:string){
        this.ixRule.script = [sRuleKey];
        return this;
    }

    /** Роли для которых доступна команда */
    role(sRuleKey:string){
        this.ixRule.role = [sRuleKey];
        return this;
    }

    /** Список задач после выполнения */
    roleList(asRuleKey:string[]){
        this.ixRule.role = asRuleKey;
        return this;
    }
}

// Типизированная функция построения ветки
export type TypeBranch = () => CiBranch;
/** Конструктор схемы CI */
export class CiSchema {

    ixBranch:Record<string, Record<string, TypeBranch>> = {};

    /** CI */
    constructor(){}

    /** Добавить правило */
    public set(sApp:string, sBranch:string, fBranch:TypeBranch){
        if(!this.ixBranch[sApp]){
            this.ixBranch[sApp] = {};
        }
        this.ixBranch[sApp][sBranch] = fBranch;
    }

    /** получить правило */
    public get(sApp:string, sBranch:string):CiBranch {
        return this.ixBranch[sApp][sBranch]();
    }

}

/** Хранилище схемы */
export const gCiSchema = new CiSchema()

/** Конструктор ветки CI */
export class CiBranch {

    sApp = '';

    sBranch = '';

    ixRule:Record<string, CiRule> = {};

    /** CI */
    constructor(sApp:string, sBranch:string){
        this.sApp = sApp;
        this.sBranch = sBranch;
    }

    /**  */
    public rule(sString:string):CiRule{
        const vCiRule = new CiRule(sString);



        return vCiRule;
    }

    /** Добавить правило */
    public set(rule:CiRule){
        this.ixRule[rule.sKey] = rule;
    }

    /** получить правило */
    public get(sKey:string){
        return this.ixRule[sKey];
    }

}