window.addEventListener('DOMContentLoaded', _ => {
  const renderDropdown = (cellData) => {
    const dropdown = new Kuc.Dropdown({
      items: [
        { label: 'Japan', value: 'japan' },
        { label: 'Viet Nam', value: 'vietnam' }
      ],
      value: cellData
    });

    return dropdown;
  };

  const renderSubtable = (cellData) => {
    const renderDropdown = (cellData) => {
      const dropdown = new Kuc.Dropdown({
        items: [
          { label: 'Japan', value: 'japan' },
          { label: 'Testing Vietnam value', value: 'vietnam' }
        ],
        value: cellData
      })
      return dropdown;
    }

    const columns = [
      {
        title: 'Dropdown',
        field: 'dropdown',
        render: renderDropdown
      },
    ]
    const data = [
      {dropdown: cellData},
    ];
    const subTable = new Kuc.Table({
      columns,
      data
    });

    subTable.addEventListener('change', event => {
      const changedDetail = event.detail;
      changedDetail.value = changedDetail.data[changedDetail.rowIndex].dropdown;
      console.log('SUB-TABLE EVENT:');
      console.log('Old data:', changedDetail.oldData[changedDetail.rowIndex].dropdown);
      console.log('New data:', changedDetail.data[changedDetail.rowIndex].dropdown);
    });
    return subTable;
  }


  const columns = [
    {
      title: 'Dropdown',
      field: 'dropdown',
      render: renderDropdown
    },
    {
      title: 'Sub-table',
      field: 'subTable',
      render: renderSubtable
    }
  ]

  const data = [
    {
      dropdown: 'japan',
      subTable: 'vietnam'
    },
    {
      dropdown: 'vietnam',
      subTable: 'japan'
    },
  ];

  const table = new Kuc.Table({
    columns,
    data
  });

  table.addEventListener('change', event => {
    const changedDetail = event.detail;
    console.log('TABLE EVENT');
    console.log('Old data: ', changedDetail.oldData[changedDetail.rowIndex]);
    console.log('Current data: ', changedDetail.data[changedDetail.rowIndex]);
  });

  document.querySelector('#simple-sub-table').appendChild(table);

});
