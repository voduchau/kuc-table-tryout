window.addEventListener('DOMContentLoaded', _ => {
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
  const renderDropdowns = (cellData, rowData) => {
    const wrapEl = document.createElement('div');
    const data = cellData ? JSON.parse(cellData) : {"country":"","city":""};
    const country = new Kuc.Dropdown({
      items: [
        { label: 'Japan', value: 'japan' },
        { label: 'Viet Nam', value: 'vietnam' }
      ],
      value: data.country
    });

    const city = new Kuc.Dropdown({
      items: relatedData[data.country],
      value: data.city
    });

    country.addEventListener("change", event => {
      city.items = relatedData[event.detail.value];
      city.value = "";
      event.detail.value = JSON.stringify({ ...JSON.parse(rowData.address), country: country.value});
    })

    city.addEventListener("change", event => {
      event.detail.value = JSON.stringify({ ...JSON.parse(rowData.address), city: city.value});
    });

    wrapEl.append(country, city);
    return wrapEl;
  };

  const columns = [
    {
      title: 'Address',
      field: 'address',
      render: renderDropdowns
    },
  ]

  const data = [
    { address: "{\"country\":\"japan\",\"city\":\"osaka\"}" },
    { address: "{\"country\":\"japan\",\"city\":\"tokyo\"}" },
    { address: "{\"country\":\"vietnam\",\"city\":\"hochiminh\"}" },
  ];

  const table = new Kuc.Table({
    columns,
    data
  });

  const handleCellChange = changedDetail => {
    if (changedDetail.field !== 'country') return;
    table.data[changedDetail.rowIndex].city = '';
  }

  table.addEventListener('change', event => {
    const changedDetail = event.detail;
    console.log('TWO DROPDOWNS IN ONE CELL');
    console.log('Following Wiki way');
    console.log('Old data: ', changedDetail.oldData[changedDetail.rowIndex]);
    console.log('Current data: ', changedDetail.data[changedDetail.rowIndex]);
    handleCellChange(changedDetail);
  });

  document.querySelector('#two-comp-wiki').appendChild(table);
});
