import moment from 'moment';
import ReactGA from 'react-ga';

import { showNotification } from './Notifications';
import { base64 } from './validators';
import api from './api';

export const noop = () => {};

export const deepCopy = arr => JSON.parse(JSON.stringify(arr));

export const displayErrors = (currentErrors, nextErrors) => {
  const _currentErrors = currentErrors.filter(error => !(error === null || error === undefined));
  const _nextErrors = nextErrors.filter(error => !(error === null || error === undefined));
  for (let i = 0; i <= _nextErrors.length - 1; i++) {// eslint-disable-line
    if (
      (_currentErrors && _currentErrors.length > 0
        && _currentErrors[i] && _currentErrors[i]._entity)
        !== (_nextErrors && _nextErrors.length > 0 && _nextErrors[i]._entity)
    ) {
      if (_nextErrors[i]._entity) showNotification(_nextErrors[i]._entity, 'error', 8000);
    }
  }
  return false;
};

export const ItemFromPayload = (payload, item) =>
  (item && payload && payload.data ? payload.data[item] : null);

export const getOptions = (url, keys, input) => {
  const token = `Bearer ${JSON.parse(localStorage.getItem('user_info'))}`;
  if (!input) {
    return Promise.resolve({ options: [] });
  }
  return fetch(url + input, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  }).then(response => response.json())
    .then(json => ({
      options: keys.split('.').reduce((obj, key) => obj[key], json).map(val => ({ label: val, value: val })),
    }));
};

export const flatToHierarchy = (arr, prop) => arr.reduce((accumulator, currentItem) => {
  const items = accumulator;
  const propValue = prop.split('.').reduce((obj, p) => obj[p], currentItem);
  items[propValue] = items[propValue]
    ? [...items[propValue], currentItem]
    : [currentItem];
  return items;
}, {});

export const camelize = str => str.replace(/_/g, ' ').replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
  if (/\s+/.test(match)) return ' ';
  return index !== 0 ? match.toLowerCase() : match.toUpperCase();
});

export const shortenTimeText = (str = '') => {
  switch (str.toLowerCase()) {
    case 'minutes':
      return 'min';
    case 'days':
      return 'days';
    default:
      return 'hrs';
  }
};

export const guidGenerator = () => {
  const S4 = () => (((1 + Math.random()) * 0x10000) || 0).toString(16).substring(1);
  return (`${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`);
};

export const getTabs = (Items, id) => {
  let children = [];
  for (let i = 0; i < Items.length; i++) { // eslint-disable-line
    if (Items[i].path === id) {
      children = Items[i].children; //eslint-disable-line
      break;
    }
    children = getTabs(Items[i].children, id);
    if (children.length > 0) {
      break;
    }
  }
  return children;
};

export const filterListForWords = (values) => {
  let list = [];
  let finalArray = [];
  if (values) {
    Object.keys(values).forEach((key) => {
      if (values[key].constructor === Array) {
        list = [...list, values[key].map(val => ({ type: key, value: val }))];
      }
    });
    list.forEach((key) => {
      finalArray = [...finalArray, ...key];
    });
  }
  return finalArray;
};

export const padZero = (str, length) => {
  const len = length || 2;
  const zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
};

export const invertColor = (hexColor, bw) => {
  let hex = hexColor;
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    return '#000000';
  }
  let r = parseInt(hex.slice(0, 2), 16);
  let g = parseInt(hex.slice(2, 4), 16);
  let b = parseInt(hex.slice(4, 6), 16);
  if (bw) {
    // http://stackoverflow.com/a/3943023/112731
    return ((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186
      ? '#000000'
      : '#FFFFFF';
  }
  // invert color components
  r = (255 - r).toString(16);
  g = (255 - g).toString(16);
  b = (255 - b).toString(16);
  // pad each with zeros and return
  return `#${padZero(r)}${padZero(g)}${padZero(b)}`;
};

export const minutesToHours = (n) => {
  const num = n;
  const hours = (num / 60);
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  const hoursDuration = rhours > 1 ? 'hrs' : 'hr';
  const minutesDuration = rminutes > 1 ? 'mins' : 'min';

  const duration = num > 60 ?
    `${rhours}${rminutes > 1 ? '+' : ''} hrs`
    : `${num} mins`;
  return {
    hours: rhours,
    minutes: rminutes,
    hoursDuration,
    minutesDuration,
    duration,
  };
};

export const Ellipsis = (string, noOfCharacters) => {
  if (string && string.length > 0) {
    const clampedLines = `${string.substring(0, noOfCharacters)}${string.substring(noOfCharacters).length > 0 ? '...' : ''}`;
    return clampedLines;
  }
  return '';
};

export const arrayGenerator = (min, max) =>
  Array(max - (min - 1)).fill().map((_, index) => (index + min));

export const isBase64 = (str) => {
  if (str === '' || str.trim() === '') return false;
  try {
    return btoa(atob(str)) === str;
  } catch (err) {
    return false;
  }
};

export const getCroppedImg = (
  image, crop, fileName,
  imageContainerStyles = {}, imageStyles = {},
) => {
  let _image = image;
  if (typeof image === 'string' && base64.test(image.replace('data:image/png;base64,', ''))) {
    const div = document.createElement('div');
    div.style = imageContainerStyles;
    document.body.appendChild(div);
    const img = new Image();
    img.src = image;
    img.style = imageStyles;
    div.appendChild(img);
    _image = img;
  }

  const canvas = document.createElement('canvas');
  // const scaleX = _image.naturalWidth / _image.width;
  // const scaleY = _image.naturalHeight / _image.height;
  canvas.width = 250;
  canvas.height = 250;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    _image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    _image.width,
    _image.height,
    // crop.width,
    // crop.height,
  );

  // As Base64 string
  // const base64Image = canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const file = new File([blob], fileName, { type: 'image/jpeg' });
      resolve(file);
    }, 'image/jpeg');
  });
};

export const getBase64 = file => (
  new Promise((resolve, reject) => {
    if (typeof file === 'string') {
      if (base64.test(file)) {
        resolve({ target: { result: file } });
      } else {
        const img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');
        img.src = file;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          const dataURL = canvas.toDataURL('image/png');
          resolve({ target: { result: dataURL } });
        };
        img.onerror = reject;
      }
    } else if (file instanceof File || file instanceof Blob) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = resolve;
      reader.onerror = reject;
    }
  })
);

export const getFileExtensionAndMIMEType = blob => (
  new Promise((resolve) => {
    try {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(blob);
      fileReader.onloadend = (e) => {
        const arr = (new Uint8Array(e.target.result)).subarray(0, 4);
        let header = '';
        for (let i = 0; i < arr.length; i += 1) {
          header += arr[i].toString(16);
        }
        let extension = '';
        let mimeType = '';
        switch (header) {
          case '89504e47':
            extension = 'png';
            mimeType = 'image/png';
            break;
          case '47494638':
            extension = 'gif';
            mimeType = 'image/gif';
            break;
          case 'ffd8ffe0':
          case 'ffd8ffe1':
          case 'ffd8ffe2':
          case 'ffd8ffe3':
          case 'ffd8ffe8':
            extension = 'jpeg';
            mimeType = 'image/jpeg';
            break;
          default:
            type = blob.type; // eslint-disable-line
            break;
        }
        resolve({ extension, mimeType });
      };
    } catch (_) {
      resolve({ extension: 'jpeg', mimeType: 'image/jpeg' });
    }
  })
);

export const range = (min, max, step = 1) =>
  Array.from({ length: ((max - min) / step) + 1 }, (_, i) => min + (step * i));

export const secondsToTime = t =>
  moment().startOf('day').seconds(t).format('hh:mm A');

export const removeObjectElement = (data, remove) => {
  const _data = JSON.parse(JSON.stringify(data));
  if (typeof remove === 'object') {
    remove.forEach((type) => {
      delete _data[type];
    });
  }
  if (typeof remove === 'string') {
    delete _data[remove];
  }
  return _data;
};

let timerId;
export const debounce = (fn, delay) => { // eslint-disable-line
  return ((...args) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  })();
};

export const getPageSize = () => {
  let pageSize = 5;
  if (window.innerWidth < 1367) {
    pageSize = 4;
  }
  if (window.innerWidth < 1025) {
    pageSize = 3;
  }
  return pageSize;
};

export const roleFinder = (roles = [], checkRole) =>
  roles.some(role => role.toLowerCase() === checkRole.toLowerCase());

export const convertTo24Hour = (time) => {
  if (time && time.length > 0) {
    let hours = Number(time.match(/^(\d+)/) && time.match(/^(\d+)/)[1]);
    const minutes = Number(time.match(/:(\d+)/) && time.match(/:(\d+)/)[1]);
    let AMPM = time.match(/\s(.*)$/);
    if (AMPM) {
      AMPM = AMPM[1]; // eslint-disable-line
      if (AMPM.toLowerCase() === 'pm' && hours < 12) hours += 12;
      if (AMPM.toLowerCase() === 'am' && hours === 12) hours -= 12;
      let sHours = hours.toString();
      let sMinutes = minutes.toString();
      if (hours < 10) sHours = `0${sHours}`;
      if (minutes < 10) sMinutes = `0${sMinutes}`;
      return `${sHours}:${sMinutes}`;
    }
  }
  return time;
};

export const uniqBy = (arr, predicate) => {
  const cb = typeof predicate === 'function' ? predicate : o => o[predicate];

  return [...arr.reduce((map, item) => {
    const key = cb(item);
    map.has(key) || map.set(key, item); // eslint-disable-line
    return map;
  }, new Map()).values()];
};

// export const getUniqueOptions = (url, input, resultKey, allowEmptyValue = false) => {
//   const token = `Bearer ${localStorage.getItem('access_token')}`;
//   if (!input && !allowEmptyValue) {
//     return Promise.resolve([]);
//   }
//   return fetch(url + input, {
//     // credentials: 'include',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: token,
//     },
//   }).then(response => response.json())
//     .then(json =>
//       uniqBy(resultKey ? json[resultKey] : json, item => item)
//         .map(option => ({ label: option, value: option })));
// };

export const getUniqueOptions =
  (url, input, resultKey, labelKey, valueKey, allowEmptyValue = false) => {
    const token = `Bearer ${localStorage.getItem('access_token')}`;
    if (!input && !allowEmptyValue) {
      return Promise.resolve([]);
    }
    return fetch(url + input, {
      // credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    }).then(response => response.json())
      .then(json => uniqBy(
        resultKey
          ? json[resultKey]
          : json,
        item => item,
      ).map((option) => {
        if (labelKey && valueKey) {
          return { label: option[labelKey], value: option[valueKey] };
        }
        return { label: option, value: option };
      }));
  };

export const lockedSequencePaddingCalculator = (totalChildren, width, height, kind) => (
  kind === 'LOCKED_SEQUENCE'
    ? {
      padding: `${(Math.round(height / 6.66) - 1) * totalChildren}px 24px 0`,
    }
    : {}
);

export const hasKey = (obj, key) => obj != null && hasOwnProperty.call(obj, key);

const saveAnalyticsData = (
  user, category, categoryId, eventType,
  isLoginFailed, callback = noop,
) => {
  const obj = {
    entity_type: category,
    entity_id: categoryId ? String(categoryId) : categoryId,
    event_type: eventType,
  };
  let url = 'events';
  if (isLoginFailed) url = 'events/log';
  if (isLoginFailed || (user && Object.keys(user).length > 0)) {
    api.post(url, obj);
  }
  callback();
};

export const pageAnalytic = (user, url, category, categoryId) => {
  saveAnalyticsData(user, category, categoryId, `${category}.View`, () => {
    ReactGA.pageview(url);
  });
};

export const eventAnalytic = (user, category, categoryId, eventType, isLoginFailed) => {
  // const _eventType = `${category}.${eventType}`;
  saveAnalyticsData(user, category, categoryId, eventType, isLoginFailed, () => {
    if (!isLoginFailed) {
      ReactGA.event({
        category,
        action: eventType,
      });
    }
  });
};

export const removeKeyDotNotation = (obj, key) => {
  const keys = key.split('.');
  const curKey = keys.shift();
  const curObj = obj[curKey];
  if (curObj && keys.length > 0) {
    removeKeyDotNotation(curObj, keys.join('.'));
  } else delete obj[curKey]; // eslint-disable-line
};

export const replaceAlphabeticalSort = (filterList, filterType) => {
  const _filterList = filterList;
  if (_filterList && _filterList.sort && (_filterList.sort[0].includes('alphabetical') || _filterList.sort[0].includes('name') || _filterList.sort[0].includes('title'))) {
    if (filterType && (filterType.key.toLowerCase() === 'strings' || filterType.key.toLowerCase() === 'enhanced_strings')) {
      if (_filterList.sort[0].charAt(0) === '-') {
        _filterList.sort[0] = '-name';
      } else {
        _filterList.sort[0] = 'name';
      }
    } else if (filterType && (filterType.key.toLowerCase() === 'elements' || filterType.key.toLowerCase() === 'enhanced_elements')) {
      if (_filterList.sort[0].charAt(0) === '-') {
        _filterList.sort[0] = '-title';
      } else {
        _filterList.sort[0] = 'title';
      }
    }
  }
  return _filterList;
};

export const findLastIndex = (array, predicate) => {
  const index = array.slice().reverse().findIndex((item, _index) => predicate(item, _index));
  const count = array.length - 1;
  const finalIndex = index >= 0 ? count - index : index;
  return finalIndex;
};

export const difference = (array, rest) => array.filter(value => !rest.includes(value));

export const stringSort = (a, b) => {
  const labelA = a.label.toLowerCase();
  const labelB = b.label.toLowerCase();
  if (labelA < labelB) return -1;
  if (labelA > labelB) return 1;
  return 0;
};
export const merge = (array1, array2, prop) => [
  ...array1.filter(aitem => !array2.find(bitem => aitem[prop] === bitem[prop])),
  ...array2,
];

export const isFeatureVisible = (user, featureName) => {
  const feature = user.features && user.features.find(_feature => _feature.feature === featureName);
  return feature && feature.status !== 'Hidden';
};

export const isFeatureEnabled = (user, featureName) => {
  const feature = user.features && user.features.find(_feature => _feature.feature === featureName);
  return feature && feature.status === 'Enabled';
};
