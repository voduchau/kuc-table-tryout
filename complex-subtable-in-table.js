window.addEventListener('DOMContentLoaded', _ => {
  const renderActivityDropdown = (cellData) => {
    const dropdown = new Kuc.Dropdown({
      items: [
        { label: 'Hiking', value: 'hiking' },
        { label: 'Running', value: 'running' }
      ],
      value: cellData
    });
    return dropdown;
  };

  const renderLocationSubtable = (cellData) => {
    const relatedData = {
      japan: [
        { label: 'Tokyo', value: 'tokyo' },
        { label: 'Osaka', value: 'osaka' }
      ],
      vietnam: [
        { label: 'Ha Noi', value: 'hanoi' },
        { label: 'Ho Chi Minh', value: 'hochiminh' }
      ]
    };
    const renderDropdowns = (cellData) => {
      const wrapEl = document.createElement('div');
      const country = new Kuc.Dropdown({
        items: [
          { label: 'Japan', value: 'japan' },
          { label: 'Viet Nam', value: 'vietnam' }
        ],
        value: cellData.country
      });
  
      const city = new Kuc.Dropdown({
        items: relatedData[cellData.country],
        value: cellData.city
      });
  
      country.addEventListener("change", event => {
        city.items = relatedData[event.detail.value];
        city.value = "";
        event.detail.value = {city: city.value, country: country.value};
      })
  
      city.addEventListener("change", event => {
        event.detail.value = {city: city.value, country: country.value};
      });
  
      wrapEl.append(country, city);
      return wrapEl;
    };

    const columns = [
      {
        title: 'City and Country',
        field: 'dropdown',
        render: renderDropdowns
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
      title: 'Activity',
      field: 'activity',
      render: renderActivityDropdown
    },
    {
      title: 'Location Sub-table',
      field: 'location',
      render: renderLocationSubtable
    }
  ]

  const data = [
    {
      activity: 'hiking',
      location: {city: 'hochiminh', country: 'vietnam'}
    },
    {
      activity: 'running',
      location: {city: 'tokyo', country: 'japan'}
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

  document.querySelector('#complex-sub-table').appendChild(table);

});
