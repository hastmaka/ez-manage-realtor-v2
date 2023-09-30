export const noteDataDummy = [
    {
        id: 1,
        created_at: Date.now(),
        updated_at: 86400000,
        severity: 'normal',
        content: 'Call the client later, because one of the document is not correct, Call the client later, because one of the document is not correct, Call the client later, because one of the document is not correct, Call the client later, because one of the document is not correct, Call the client later, because one of the document is not correct, Call the client later, because one of the document is not correct, Call the client later, because one of the document is not correct,Call the client later, because one of the document is not correct, Call the client later, because one of the document is not correct, Call the client later, because one of the document is not correct',
        who: 'Yanet Lameda'
    },
    {
        id: 2,
        created_at: Date.now() - 86400000, // 1 day ago
        updated_at: 86400000,
        severity: 'high',
        content: 'Follow up with the supplier regarding the delayed shipment',
        who: 'John Doe'
    },
    {
        id: 3,
        created_at: Date.now() - 172800000, // 2 days ago
        updated_at: 86400000,
        severity: 'low',
        content: 'Prepare the presentation slides for the upcoming meeting',
        who: 'Jane Smith'
    },
    {
        id: 4,
        created_at: Date.now() - 259200000, // 3 days ago
        updated_at: 86400000,
        severity: 'low',
        content: 'Send a reminder email to the team about the upcoming deadline',
        who: 'Mike Johnson'
    }
]