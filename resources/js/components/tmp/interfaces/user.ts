

export interface UserModel {
        id: number;
        type_user_id: number;
        companie_id: number | undefined;
        nickname: string;
        user_name: string | undefined;
        first_name: string;
        last_name: string | undefined;
        email: string;
        email_verified_at: string | undefined;
        password: string | undefined;
        avatar: string | undefined;
        twitter: string | undefined;
        permission: Permission | undefined
        instagram: string | undefined;
        facebook: string | undefined;
        linkedin: string | undefined;
        quora: string | undefined;
        google: string | undefined;
        bio: string | undefined;
        country: string | undefined;
        timezone: string;
        website: string | undefined;
        dial_code: string | undefined;
        phone: string | undefined;
        birthday: string | undefined;
        status: 'active' | 'banned' | 'close';
        rememberToken: string;
        last_active_at: string | undefined;
        created_at: string;
        updated_at: string;
        deleted_at: string | undefined;
}

export interface Permission {
        id: number
        user_id: number
        email: 0 | 1
        chat: 0 | 1
        todo: 0 | 1
        calendar: 0 | 1
        kanban: 0 | 1
        fileManager: 0 | 1
        timesheet: 0 | 1
        deleteScreenshots: 0 | 1
        findCustomer: 0 | 1
        addCustomer: 0 | 1
        products_services: 0 | 1
        jobRequest: 0 | 1 
        postingRequest: 0 | 1
        jobPosted: 0 | 1
        jobsApplication: 0 | 1
        overHR: 0 | 1
        newDeposit: 0 | 1
        newExpense: 0 | 1
        viewTrans: 0 | 1
        balanceSheet: 0 | 1
        transferRep: 0 | 1
        clientPay: 0 | 1
        expenseManag: 0 | 1
        expenseCat: 0 | 1
        invoice: 0 | 1
        newQuote: 0 | 1
        payment: 0 | 1
        taxeRate: 0 | 1
        salarayTemplate: 0 | 1
        hourly: 0 | 1
        manageSalary: 0 | 1
        employeeSal: 0 | 1
        generatPayslip: 0 | 1
        payrollsummary: 0 | 1
        inventory: 0 | 1
        projectManagement: 0 | 1
        projectReport: 0 | 1
        clientReport: 0 | 1
        expenseReport: 0 | 1
        incomeExpense: 0 | 1
        projectProgressions: 0 | 1
        shareReport: 0 | 1
}