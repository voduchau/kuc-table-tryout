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
  }

  let lastRenderedCountryComponent;
  const renderCountry = (cellData) => {
    const dropdown = new Kuc.Dropdown({
      items: [
        { label: 'Japan', value: 'japan' },
        { label: 'Viet Nam', value: 'vietnam' }
      ],
      value: cellData
    });

    lastRenderedCountryComponent = dropdown;
    return dropdown;
  };

  const renderCity = (cellData) => {
    const dropdown = new Kuc.Dropdown({
      items: relatedData[lastRenderedCountryComponent.value],
      value: cellData
    });

    lastRenderedCountryComponent.addEventListener("change", e => {
      dropdown.items = relatedData[e.detail.value]
      dropdown.value = cellData;
    })

    return dropdown;
  };

  const columns = [
    {
      title: 'Country',
      field: 'country',
      render: renderCountry
    },
    {
      title: 'City',
      field: 'city',
      render: renderCity
    }
  ]

  const data = [
    {
      country: 'japan',
      city: 'osaka',
    },
    {
      country: 'vietnam',
      city: 'hochiminh',
    },
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
    handleCellChange(changedDetail);
    console.log("TWO RELATED COMPS IN ONE ROW:");
    console.log(changedDetail);
  });

  document.querySelector('#two-dropdown-one-row').appendChild(table);
});
